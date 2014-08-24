'use strict';

var _ = require('lodash');
var Reflux = require('reflux');

var husl = require('husl');
var Colr = require('colr');

var actions = require('../actions');

var generateRandomColors = function () {
  var colors = {};

  // 6 hues to pick from
  var baseHue = _.random(0, 360);
  var hues = _.map([0, 60, 120, 180, 240, 300], function (offset) {
    return (baseHue + offset) % 360;
  });

  //  8 shades of low-saturated color
  var baseSaturation = _.random(5, 40);
  var baseLightness = _.random(0, 10);
  var rangeLightness = 90 - baseLightness;

  colors.background = Colr.fromHex(husl.toHex(
    hues[0],
    baseSaturation,
    baseLightness / 2
  ));

  colors.foreground = Colr.fromHex(husl.toHex(
    hues[0],
    baseSaturation,
    rangeLightness
  ));

  for (var i = 0; i < 8; i += 1) {
    colors[i] = Colr.fromHex(husl.toHex(
      hues[0],
      baseSaturation,
      baseLightness + (rangeLightness * Math.pow(i/7, 1.5))
    ));
  }

  // 8 random shades
  var minSat = _.random(30, 70);
  var maxSat = minSat + 30;
  var minLight = _.random(50, 70);
  var maxLight = minLight + 20;

  for (var j = 8; j < 16; j += 1) {
    colors[j] = Colr.fromHex(husl.toHex(
      hues[_.random(0, hues.length - 1)],
      _.random(minSat, maxSat),
      _.random(minLight, maxLight)
    ));
  }

  return colors;
};

var RandomStore = Reflux.createStore({

  init: function () {
    this.listenTo(actions.generateRandomColors, this._generateRandomColors);
  },

  _generateRandomColors: function () {
    actions.setAllColors(generateRandomColors());
  }

});

module.exports = RandomStore;
