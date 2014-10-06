'use strict';

var Reflux     = require('reflux');
var Ranger     = require('react-ranger');
var termcolors = require('termcolors');
var Path       = require('path');

var actions      = require('../actions');
var LocalStore   = require('../utils/local');
var AppStore     = require('../stores/app');
var importScheme = require('../utils/importScheme');
var Repository   = require('../utils/repository');

var repo = new Repository({

  id: 'scheme',
  folder: 'schemes',
  ext: '.json',

  parseFn: importScheme,

});

var SchemeStore = Reflux.createStore({

  listenables: {
    saveScheme: actions.saveScheme,
  },

  init: function () {
    this.rangerStore = Ranger.createStore(null, this._handleRanger.bind(this));
      repo.init(this.rangerStore, this.trigger.bind(this));
  },

  get: function (path) {
    return repo.cache[path];
  },

  load: function (path, cb) {
    var self = this;
    return repo.retrieve(path, function (content) {
      if (cb) { cb(content); }
      self.trigger();
    });
  },

  // actions.saveScheme
  saveScheme: function (path, author) {
    if (path[0] !== '/') { path = '/' + path; }
    var colors = AppStore.getState().colors;
    var json = JSON.parse(termcolors.json.export(colors));
    json.name = Path.basename(path);
    json.author = author;
    repo.deposit(path, json);
  },

  _handleRanger: function (item) {
    this.load(item.path, function (scheme) {
      actions.setAllColors(scheme.colors);
    });
  },

});

module.exports = SchemeStore;
