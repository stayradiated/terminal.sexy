'use strict';

var $ = require('jquery');
var Reflux = require('reflux');
var Ranger = require('react-ranger');
var termio = require('termio');
var concat = require('concat-stream');

var actions = require('../actions');
var LocalStore = require('../utils/local');

// constants
var FOLDER = 'templates';
var EXT = '.html';
var INDEX = FOLDER + '/index.json';
var STORAGE_ID = 'Template::';

// templates
var loadedTemplates = {};
var rangerStore;

var TemplateStore = Reflux.createStore({

  init: function () {
    this.listenTo(actions.openTemplate, this._openTemplate);
    this.listenTo(actions.importTemplate, this._importTemplate);

    rangerStore = Ranger.createStore(null, this._handleRanger.bind(this));
    this.loadIndex();
  },

  loadIndex: function () {
    var self = this;
    $.get(INDEX).then(function (content) {
      rangerStore.setRootDir(Ranger.parseList(content));
      self.trigger();
    });
  },

  rangerStore: function () {
    return rangerStore;
  },

  allLoadedTemplates: function () {
    return loadedTemplates;
  },

  isLoaded: function (id) {
    return loadedTemplates.hasOwnProperty(id);
  },

  get: function (id) {
    if (! TemplateStore.isLoaded(id)) {
      return false;
    }
    return loadedTemplates[id];
  },

  load: function (id) {
    var self = this;
    return $.get(FOLDER + id + EXT).then(function (content) {
      loadedTemplates[id] = content;
      self.trigger();
      return content;
    });
  },

  _openTemplate: function (path) {
    actions.openWindow('template', {path: path});
  },

  _importTemplate: function (filename, stream) {
    stream.pipe(termio()).pipe(concat(function (contents) {
      contents = contents.toString();
      filename = '/user/' + filename;
      loadedTemplates[filename] = contents;
      LocalStore.save(STORAGE_ID + filename, contents);
      actions.openTemplate(filename);
    }));
  },

  _handleRanger: function (item) {
    this._openTemplate(item.path);
  },

});

module.exports = TemplateStore;
