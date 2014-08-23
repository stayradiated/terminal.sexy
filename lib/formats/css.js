var _ = require('lodash');
var fs = require('fs');
var termcolors = require('termcolors');
var Colr = require('colr');

var template = fs.readFileSync(__dirname + '/css.dot', 'utf8');

module.exports = {
  export: termcolors.export(template, function (colors) {
    hex = _.mapValues(colors, function (color) {
      return color.toHex();
    });

    var contrast = colors.background.toGrayscale() > 128 ? 'darken' : 'lighten';

    hex.alt = colors.background.clone()[contrast](10).toHex();

    return hex;
  })
};
