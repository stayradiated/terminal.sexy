'use strict';

var _ = require('lodash');
var fs = require('fs');
var termcolors = require('termcolors');
var Colr = require('colr');

var cssTemplate = fs.readFileSync(__dirname + '/css.dot', 'utf8');
var regex = /\s*\/\*\s*====\s*(\w+)\s*====\s*\*\/\s*/mig;

function convertToHex (color) {
  return color.toHex();
}

var templateFn = {

  // calculating hsl before cloning gives speed improvement

  background: function (color) {
    var theme = { background: color.toHex() };
    color.toRawHslArray();

    if (color.toGrayscale() < 128) {
      // dark theme
      theme.desktop = color.clone().darken(3).toHex();
      theme.bgSubtle = color.clone().lighten(10).toHex();
    } else {
      // light theme
      theme.desktop = color.clone().darken(7).toHex();
      theme.bgSubtle = color.clone().darken(20).toHex();
    }

    return theme;
  },

  foreground: function (color) {
    var theme = { foreground: color.toHex() };
    color.toRawHslArray();

    if (color.toGrayscale() < 128) {
      // light theme
      theme.fgSubtle = color.clone().lighten(20).toHex();
    } else {
      // dark theme
      theme.fgSubtle = color.clone().darken(15).toHex();
    }

    return theme;
  },

  0: convertToHex,
  1: convertToHex,
  2: convertToHex,
  3: convertToHex,
  4: convertToHex,
  5: convertToHex,
  6: convertToHex,
  7: convertToHex,
  8: convertToHex,
  9: convertToHex,
  10: convertToHex,
  11: convertToHex,
  12: convertToHex,
  13: convertToHex,
  14: convertToHex,
  15: convertToHex,
  font: _.identity,
};

var match, nextMatch, template;
var matches = [];
var templates = {};

while ((match = regex.exec(cssTemplate)) !== null) {
  var len = match[0].length;
  var id = match[1];
  var index = match.index;
  matches.push([id, index, index + len]);
}

for (var i = 0, len = matches.length; i < len; i += 1) {
  match = matches[i];
  id = match[0];
  nextMatch = matches[i+1];
  nextMatch = nextMatch ? nextMatch[1] : cssTemplate.length;
  template = cssTemplate.substring(match[2], nextMatch);
  templates[id] = termcolors.export(template, templateFn[id]);
}

module.exports = {
  export: function (id, data) {
    return templates[id](data);
  }
};
