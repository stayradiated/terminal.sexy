'use strict';

var $      = require('jquery');
var _      = require('lodash');
var Ranger = require('react-ranger');

var version = require('../../package.json').version;
var LocalStore = require('../utils/local');

var Repository = function (options) {
  if (options instanceof Repository) { return options; }
  if (! (this instanceof Repository)) { return new Repository(options); }

  this.cache = {};
  this.userIndex = [];

  this.id = options.id;
  this.folder = options.folder;
  this.ext = options.ext;
  this.indexUrl = this.folder + '/index.json';
  this.storageId = this.id + '::';
  this.storageIndexId = 'index::' + this.id;
  this.parseFn = options.parseFn || _.identity;
  this.dataType = options.dataType || 'json';
};

_.extend(Repository.prototype, {

  init: function (rangerStore, cb) {
    this.rangerStore = rangerStore;
    this.fetchUserIndex();
    this.fetchServerIndex().then(cb || _.noop);
  },

  fetchServerIndex: function () {
    var self = this;
    return $.ajax({
      url: this.indexUrl,
      dataType: 'json',
    }).then(function (content) {
      Ranger.parseList(content, { root: self.rangerStore.getRootDir() });
      self.rangerStore.trigger();
    });
  },

  fetchUserIndex: function () {
    this.userIndex = LocalStore.load(this.storageIndexId) || [];

    for (var i = 0, len = this.userIndex.length; i < len; i += 1) {
      var path = this.userIndex[i];
      var content = LocalStore.load(this.storageId + path);
      this.cache[path] = this.parseFn(content);
    }

    Ranger.parseList(this.userIndex, { root: this.rangerStore.getRootDir() });
    this.rangerStore.trigger();
  },

  retrieve: function (path, cb) {
    if (this.cache.hasOwnProperty(path)) {
      return cb(this.cache[path]);
    }

    var self = this;
    var url = this.folder + path + this.ext + '?v=' + version;
    return $.ajax({
      url: url,
      dataType: this.dataType,
    }).then(function (content) {
      content = self.parseFn(content);
      self.cache[path] = content;
      return cb(content);
    });
  },

  deposit: function (path, content) {
    this.userIndex.push(path);
    this.cache[path] = this.parseFn(content);
    LocalStore.save(this.storageId + path, content);
    LocalStore.save(this.storageIndexId, this.userIndex);
    Ranger.parseList([path], { root: this.rangerStore.getRootDir() });
    this.rangerStore.trigger();
  },

});

module.exports = Repository;
