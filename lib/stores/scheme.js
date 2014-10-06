'use strict';

var _      = require('lodash');
var $      = require('jquery');
var fs     = require('fs');
var Colr   = require('colr');
var Reflux = require('reflux');
var Ranger = require('react-ranger');
var termcolors = require('termcolors');
var Path = require('path');

var actions = require('../actions');
var LocalStore = require('../utils/local');
var AppStore = require('../stores/app');
var importScheme = require('../utils/importScheme');

// constants
var FOLDER = 'schemes';
var EXT = '.json';
var INDEX = FOLDER + '/index.json';
var STORAGE_ID = 'scheme::';
var STORAGE_INDEX_ID = 'index::scheme';

// schemes
var userSchemes = [];
var rangerStore;

var SchemeStore = Reflux.createStore({

  listenables: {
    loadScheme: actions.loadScheme,
    saveScheme: actions.saveScheme,
  },

  init: function () {
    rangerStore = Ranger.createStore(null, this._handleRanger.bind(this));
    this.loadServerSchemes();
  },

  loadServerSchemes: function () {
    var self = this;
    $.get(INDEX).then(function (content) {
      rangerStore.setRootDir(Ranger.parseList(content));
      self.trigger();
      self.loadUserSchemes();
    });
  },

  loadUserSchemes: function () {
    userSchemes = LocalStore.load(STORAGE_INDEX_ID) || [];

    var schemes = userSchemes.map(function (path) {
      var json = LocalStore.load(STORAGE_ID + path);
      var scheme = importScheme(json);
      scheme.path = path;
      return scheme;
    });

    console.log(schemes);

    Ranger.parseFiles(schemes, { id: 'path', root: rangerStore.getRootDir() });
    this.trigger();
  },

  loadScheme: function (item) {
    var self = this;
    this.fetchScheme(item, function () {
      self.trigger();
    });
  },

  rangerStore: function () {
    return rangerStore;
  },

  _handleRanger: function (item) {
    this.fetchScheme(item, function (scheme) {
      actions.setAllColors(scheme.colors);
    });
  },

  fetchScheme: function (item, cb) {
    if (item.contents !== undefined) {
      return cb(item.contents);
    }

    var self = this;
    $.get(FOLDER + item.path).then(function (content) {
      item.contents = importScheme(content);
      cb(item.contents);
    });
  },

  saveScheme: function (path, author) {
    if (path[0] !== '/') { path = '/' + path; }
    var colors = AppStore.getState().colors;
    var json = JSON.parse(termcolors.json.export(colors));
    json.name = Path.basename(path);
    json.author = author;
    userSchemes.push(path);
    LocalStore.save(STORAGE_ID + path, json);
    LocalStore.save(STORAGE_INDEX_ID, userSchemes);
  },

});

module.exports = SchemeStore;
