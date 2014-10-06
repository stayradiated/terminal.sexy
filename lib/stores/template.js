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
var STORAGE_ID = 'template::';
var STORAGE_INDEX_ID = 'index::template';

// templates
var userTemplates = [];
var loadedTemplates = {};
var rangerStore;

var TemplateStore = Reflux.createStore({

  init: function () {
    this.listenTo(actions.openTemplate, this._openTemplate);
    this.listenTo(actions.importTemplate, this._importTemplate);

    rangerStore = Ranger.createStore(null, this._handleRanger.bind(this));
    this.loadServerTemplates();
  },

  loadServerTemplates: function () {
    var self = this;
    $.get(INDEX).then(function (content) {
      rangerStore.setRootDir(Ranger.parseList(content));
      self.trigger();
      self.loadUserTemplates();
    });
  },

  loadUserTemplates: function () {
    userTemplates = LocalStore.load(STORAGE_INDEX_ID) || [];

    userTemplates.forEach(function (path) {
      loadedTemplates[path] = LocalStore.load(STORAGE_ID + path);
    });

    Ranger.parseList(userTemplates, { root: rangerStore.getRootDir() });
    this.trigger();
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
    return loadedTemplates[id];
  },

  load: function (id, fn) {
    var self = this;

    if (this.isLoaded(id)) {
      return fn(this.get(id));
    }

    return $.get(FOLDER + id + EXT).then(function (content) {
      loadedTemplates[id] = content;
      self.trigger();
      return fn(content);
    });
  },

  _openTemplate: function (path) {
    actions.openWindow('template', {path: path});
  },

  _importTemplate: function (path, stream) {
    var self = this;

    if (path[0] !== '/') {
      path = '/' + path;
    }

    stream.pipe(termio()).pipe(concat(function (contents) {
      contents = contents.toString();

      userTemplates.push(path);
      loadedTemplates[path] = contents;
      LocalStore.save(STORAGE_ID + path, contents);
      LocalStore.save(STORAGE_INDEX_ID, userTemplates);

      actions.openTemplate(path);

      Ranger.parseList([path], { root: rangerStore.getRootDir() });
      self.trigger();
    }));
  },

  _handleRanger: function (item) {
    this._openTemplate(item.path);
  },

});

module.exports = TemplateStore;
