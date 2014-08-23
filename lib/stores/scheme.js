var _      = require('lodash');
var fs     = require('fs');
var Colr   = require('colr');
var Reflux = require('reflux');

var loadScheme = function (scheme) {
  var output = {
    name: scheme.name || '',
    author: scheme.author || '',
    colors: {
      background: Colr.fromHex(scheme.background),
      foreground: Colr.fromHex(scheme.foreground)
    }
  };

  var colors = scheme.color.map(Colr.fromHex);

  // if the colorscheme only has eight colors, generate the other eight
  if (colors.length == 8) {
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

var _schemes = [
  require('../../schemes/classy-touch'),
  require('../../schemes/erosion'),
  require('../../schemes/jetplane-dark'),
  require('../../schemes/jetplane'),
  require('../../schemes/kasugano'),
  require('../../schemes/monokai'),
  require('../../schemes/my-first-colorscheme'),
  require('../../schemes/not_monokai'),
  require('../../schemes/papirus-dark'),
  require('../../schemes/tillwhen'),
  require('../../schemes/navy-and-ivory'),
  require('../../schemes/vacuous2'),
  require('../../schemes/base16-default-dark'),
  require('../../schemes/base16-default-light'),
].map(loadScheme);

var SchemeStore = Reflux.createStore({

  getSchemes: function () {
    return _schemes;
  }

});

module.exports = SchemeStore;
