'use strict';

var $ = require('jquery');
var Reflux = require('reflux');

var actions = require('../actions');

var loadedTemplates = {};

var FOLDER = 'templates/';
var EXT = '.html';

var TemplateStore = Reflux.createStore({

  availableTemplates: function () {
    // TODO: replace with something better
    return [
      'vim/default/bash',
      'vim/default/c++',
      'vim/default/fortran',
      'vim/default/haskell',
      'vim/default/html',
      'vim/default/java',
      'vim/default/javascript',
      'vim/default/latex',
      'vim/default/lua',
      'vim/default/perl',
      'vim/default/php',
      'vim/default/python',
      'vim/default/ruby',
      'vim/default/sql',
      'vim/default-bright/bash',
      'vim/default-bright/c++',
      'vim/default-bright/fortran',
      'vim/default-bright/haskell',
      'vim/default-bright/html',
      'vim/default-bright/java',
      'vim/default-bright/javascript',
      'vim/default-bright/latex',
      'vim/default-bright/lua',
      'vim/default-bright/perl',
      'vim/default-bright/php',
      'vim/default-bright/python',
      'vim/default-bright/ruby',
      'vim/default-bright/sql',
      'vim/stayrad/bash',
      'vim/stayrad/c++',
      'vim/stayrad/fortran',
      'vim/stayrad/haskell',
      'vim/stayrad/html',
      'vim/stayrad/java',
      'vim/stayrad/javascript',
      'vim/stayrad/latex',
      'vim/stayrad/lua',
      'vim/stayrad/perl',
      'vim/stayrad/php',
      'vim/stayrad/python',
      'vim/stayrad/ruby',
      'vim/stayrad/sql',
      'vim/shblah/bash',
      'vim/shblah/c++',
      'vim/shblah/fortran',
      'vim/shblah/haskell',
      'vim/shblah/html',
      'vim/shblah/java',
      'vim/shblah/javascript',
      'vim/shblah/latex',
      'vim/shblah/lua',
      'vim/shblah/perl',
      'vim/shblah/php',
      'vim/shblah/python',
      'vim/shblah/ruby',
      'vim/shblah/sql',
      'misc/columns',
      'misc/rows'
    ];
  },

  init: function () {
    this.listenTo(actions.openTemplate, this._openTemplate);
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

  _openTemplate: function (id) {
    actions.openWindow('template::' + id);
  }

});

module.exports = TemplateStore;
