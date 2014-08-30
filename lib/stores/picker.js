'use strict';

var _ = require('lodash');
var Reflux = require('reflux');
var Colr = require('colr');

var actions = require('../actions');
var AppStore = require('./app');

var state = {
  activeId: null,
  color: Colr.fromHex('#000000'),
};

var setColor = _.throttle(actions.setColor, 50);

var Picker = Reflux.createStore({

  init: function () {
    this.listenTo(actions.pickColor, this._pickColor);
  },

  getState: function () {
    return state;
  },

  _pickColor: function (id) {
    state.activeId = id;
    state.color = AppStore.getState().colors[id];

    actions.openWindow('colorpicker');
    this.trigger();
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
