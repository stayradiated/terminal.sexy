var _ = require('lodash');
var fs = require('fs');
var Signals = require('signals');

var tiny = require('tinytinycolor');
var husl = require('husl');

tiny.prototype.toHuslArray = function () {
  return husl.fromRGB(this._r/255, this._g/255, this._b/255);
};

tiny.prototype.toHusl = function () {
  var colors = this.toHuslArray();
  return {
    h: colors[0],
    s: colors[1],
    l: colors[2]
  };
};


var loadScheme = function (scheme) {
  var output = {
    name: scheme.name || '',
    author: scheme.author || '',
    colors: {
      background: tiny(scheme.background),
      foreground: tiny(scheme.foreground)
    }
  };

  var colors = scheme.color.map(tiny);

  if (colors.length == 8) {
    colors.forEach(function (color, id) {
      var hsl = color.toHusl();
      if (hsl.l < 80) {
        hsl.l += 10;
      } else {
        hsl.l -= 10;
      }
      colors[id + 8] = tiny(husl.toHex(hsl.h,hsl.s,hsl.l));
    });
  }

  _.extend(output.colors, colors);
  return output;
};

var _schemes = [
  require('../schemes/classy-touch'),
  require('../schemes/erosion'),
  require('../schemes/jetplane-dark'),
  require('../schemes/jetplane'),
  require('../schemes/kasugano'),
  require('../schemes/monokai'),
  require('../schemes/my-first-colorscheme'),
  require('../schemes/not_monokai'),
  require('../schemes/papirus-dark'),
  require('../schemes/tillwhen')
].map(loadScheme);

var SchemeStore = Signals.convert({

  getSchemes: function () {
    return _schemes;
  }

});

module.exports = SchemeStore;
