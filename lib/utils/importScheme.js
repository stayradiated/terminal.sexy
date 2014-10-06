'use strict';

var _      = require('lodash');
var Colr   = require('colr');

var importScheme = function (json) {
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
};

module.exports = importScheme;
