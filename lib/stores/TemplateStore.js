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

load('columns');

var TemplateStore = Signals.convert({

  getTemplates: function () {
    return _templates;
  },

  get: function (id) {
    return _templates[id];
  }

});

module.exports = TemplateStore;
