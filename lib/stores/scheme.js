'use strict';

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

var _schemes = [
  require('../../schemes/base16-default-dark.json'),
  require('../../schemes/base16-default-light.json'),
  require('../../schemes/dawn.json'),
  require('../../schemes/hund.json'),
  require('../../schemes/hybrid.json'),
  require('../../schemes/invisibone.json'),
  require('../../schemes/jmbi.json'),
  require('../../schemes/kasugano.json'),
  require('../../schemes/mostly-bright.json'),
  require('../../schemes/navy-and-ivory.json'),
  require('../../schemes/pretty-and-pastel.json'),
  require('../../schemes/s3r0-modified.json'),
  require('../../schemes/sweetlove.json'),
  require('../../schemes/trim-yer-beard.json'),
  require('../../schemes/vacuous2.json'),
  require('../../schemes/visibone-alt-2.json'),
  require('../../schemes/x-dotshare.json'),
  require('../../schemes/x-erosion.json'),
  require('../../schemes/yousai.json'),
].map(loadScheme);

var SchemeStore = Reflux.createStore({

  getSchemes: function () {
    return _schemes;
  }

});

module.exports = SchemeStore;
