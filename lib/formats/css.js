'use strict';

var _ = require('lodash');
var fs = require('fs');
var termcolors = require('termcolors');

var template = fs.readFileSync(__dirname + '/css.dot', 'utf8');

module.exports = {
  export: termcolors.export(template, function (colors) {
    var theme = _.mapValues(colors, function (color) {
      return color.toHex();
    });

    if (colors.background.toGrayscale() < 128) {
      // dark theme
      theme.desktop = colors.background.clone().darken(3).toHex();
      theme.bgSubtle = colors.background.clone().lighten(10).toHex();
      theme.fgSubtle = colors.foreground.clone().darken(30).toHex();

    } else {
      // light theme
      theme.desktop = colors.background.clone().darken(7).toHex();
      theme.bgSubtle = colors.background.clone().darken(20).toHex();
      theme.fgSubtle = colors.foreground.clone().lighten(10).toHex();

    }

    return theme;
  })
};
