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

    var bg = colors.background;
    var fg = colors.foreground;
    bg.toRawHslArray();
    fg.toRawHslArray();

    if (bg.toGrayscale() < 128) {
      // dark theme
      theme.desktop = bg.clone().darken(3).toHex();
      theme.bgSubtle = bg.clone().lighten(10).toHex();
      theme.fgSubtle = fg.clone().darken(10).toHex();
    } else {
      // light theme
      theme.desktop = bg.clone().darken(7).toHex();
      theme.bgSubtle = bg.clone().darken(20).toHex();
      theme.fgSubtle = fg.clone().lighten(10).toHex();
    }

    return theme;
  })
};
