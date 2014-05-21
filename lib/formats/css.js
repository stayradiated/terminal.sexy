var _ = require('lodash');
var fs = require('fs');
var termcolors = require('termcolors');
var tiny = require('tinytinycolor');

var template = fs.readFileSync(__dirname + '/css.dot', 'utf8');

module.exports = {
  export: termcolors.export(template, function (colors) {
    hex = _.mapValues(colors, function (color) {
      return color.toHexString();
    });

    var contrast = colors.background.toHsl().l > 0.5 ? 'darken' : 'lighten';
    hex.alt = tiny[contrast](colors.background, 7).toHexString();

    return hex;
  })
};
