'use strict';

var _      = require('lodash');
var $      = require('jquery');
var fs     = require('fs');
var Colr   = require('colr');
var Reflux = require('reflux');
var Ranger = require('react-ranger');

var actions = require('../actions');

// constants
var FOLDER = 'schemes';
var EXT = '.json';
var INDEX = FOLDER + '/index.json';

var schemes = [];
var rangerStore;

var SchemeStore = Reflux.createStore({

  listenables: {
    loadScheme: actions.loadScheme,
  },

  init: function () {
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
      item.contents = self.importScheme(content);
      cb(item.contents);
    });
  },

  importScheme: function (json) {
    var output = {
      name: json.name || '',
      author: json.author || '',
      colors: {
        background: Colr.fromHex(json.background),
        foreground: Colr.fromHex(json.foreground)
      }
    };

    var colors = json.color.map(Colr.fromHex);

    // if the colorscheme only has eight colors, generate the other eight
    if (colors.length === 8) {
      colors.forEach(function (color, id) {
        var newColor = color.clone();
        var method = color.toGrayscale() < 128 ? 'darken' : 'lighten';
        newColor[method](10);
        colors[id + 8] = newColor;
      });
    }

    _.extend(output.colors, colors);
    return output;
  },

});

/*
 * Fetch Scheme
 * ============
 *
 * Download the scheme data as a JSON object.
 * Then convert it to a scheme and cache the contents.
 * Only downloads the file once.
 */


module.exports = SchemeStore;
