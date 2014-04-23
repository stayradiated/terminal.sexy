var _ = require('underscore');
var tinycolor = require('../vendor/tinycolor');

module.exports = {

  export : function (input) {
    var css = {};

    css['.alt-background-bg'] = {
      background: tinycolor.lighten(input.background, 3).toHexString()
    };

    css['.background-bg'] = {
      background: input.background.toHexString()
    };

    css['.foreground-fg'] = {
      color: input.foreground.toHexString()
    };

    for (var i = 0; i < 16; i++) {
      css['.foreground-' + i] = { color: input[i].toHexString() };
      css['.background-' + i] = { background: input[i].toHexString() };
    }

    return _.reduce(css, function (output, styles, selector) {
      output += selector + '{';
      output += _.reduce(styles, function (string, value, key) {
        return string + key + ':' + value + ' !important;';
      }, '');
      output += '}\n';
      return output;
    }, '');
  }

};
