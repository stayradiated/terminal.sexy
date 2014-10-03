'use strict';

var $ = require('jquery');
var Reflux = require('reflux');
var Ranger = require('react-ranger');

var actions = require('../actions');

// constants
var FOLDER = 'templates/';
var EXT = '.html';
var INDEX = FOLDER + 'index.json';

// templates
var loadedTemplates = {};
var rangerStore;

var TemplateStore = Reflux.createStore({

  init: function () {
    this.listenTo(actions.openTemplate, this._openTemplate);

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

  _handleRanger: function (item) {
    this._openTemplate(item.path);
  },

});

module.exports = TemplateStore;
