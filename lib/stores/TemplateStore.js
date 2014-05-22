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
      'columns'
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
