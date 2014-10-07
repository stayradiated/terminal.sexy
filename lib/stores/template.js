'use strict';

var $      = require('jquery');
var Reflux = require('reflux');
var Ranger = require('react-ranger');
var termio = require('termio');
var concat = require('concat-stream');

var actions    = require('../actions');
var LocalStore = require('../utils/local');
var Repository   = require('../utils/repository');

var repo = new Repository({

  id: 'template',
  folder: 'templates',
  ext: '.html',
  dataType: 'html',

  // use content as is
  parseFn: null,

});

var TemplateStore = Reflux.createStore({

  listenables: {
    openTemplate: actions.openTemplate,
    importTemplate : actions.importTemplate,
  },

  init: function () {
    this.rangerStore = Ranger.createStore(null, this._handleRanger.bind(this));
    repo.init(this.rangerStore, this.trigger.bind(this));
  },

  get: function (path) {
    return repo.cache[path];
  },

  preload: function (path, cb) {
    return repo.retrieve(path, cb);
  },

  // actions.openTemplate
  openTemplate: function (path) {
    actions.openWindow('template', {path: path});
  },

  // actions.importTemplate
  importTemplate: function (path, stream) {
    var self = this;

    if (path[0] !== '/') {
      path = '/' + path;
    }

    stream.pipe(termio()).pipe(concat(function (content) {
      content = content.toString();
      repo.deposit(path, content);

      actions.openTemplate(path);
      self.trigger();
    }));
  },

  _handleRanger: function (item) {
    this.openTemplate(item.path);
  },

});

module.exports = TemplateStore;
