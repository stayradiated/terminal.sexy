'use strict';

var _ = require('lodash');
var Reflux = require('reflux');
var Colr = require('colr');

var actions = require('../actions');
var AppStore = require('./app');
var LocalStore = require('../utils/local');

var STORAGE_ID = 'picker::settings';

var settings = LocalStore.load(STORAGE_ID) || {};

settings = _.defaults(settings || {}, {
  throttle: 100,
});

var state = {
  activeId: null,
  color: Colr.fromHex('#000000'),
};

var setColor;

var Picker = Reflux.createStore({

  listenables: {
    pickColor: actions.pickColor,
    setPicker: actions.setPicker,
  },

  init: function () {
    setColor = _.throttle(actions.setColor, settings.throttle);
  },

  getState: function () {
    return state;
  },

  getSettings: function () {
    return settings;
  },

  // actions.pickColor
  pickColor: function (id) {
    state.activeId = id;
    state.color = AppStore.getState().colors[id];

    actions.openWindow('colorpicker');
    this.trigger();
  },

  // actions.setPicker
  setPicker: function (options) {
    _.extend(settings, options);
    LocalStore.save(STORAGE_ID, settings);
    this.init();
  },

  // bound to the React-ColorPicker
  onChange: function (color) {
    state.color = color;
    if (state.activeId === null) {
      return;
    }
    setColor(state.activeId, color);
  }

});

module.exports = Picker;
