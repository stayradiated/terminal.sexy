var $ = require('jquery');
var Signals = require('signals');

var _templates = {};

var FOLDER = 'templates/';
var EXT = '.html';

var load = function (id) {
  return $.get(FOLDER + id + EXT).then(function (content) {
    _templates[id] = content;
    TemplateStore.emit('change');
    return content;
  });
};

var TemplateStore = Signals.convert({

  availableTemplates: function () {
    // TODO: replace with something dynamic
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
      'misc/columns',
      'misc/rows'
    ];
  },

  allLoadedTemplates: function () {
    return _templates;
  },

  isLoaded: function (id) {
    return _templates.hasOwnProperty(id);
  },

  get: function (id) {
    if (! TemplateStore.isLoaded(id)) return false;
    return _templates[id];
  },

  load: function (id) {
    return load(id);
  }

});

module.exports = TemplateStore;