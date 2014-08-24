'use strict';

var _ = require('lodash');
var Reflux = require('reflux');

var actions = require('../actions');
var AppStore = require('./app');

var state = {
  activeId: null,
  color: '#000000'
};

var setColor = _.throttle(actions.setColor, 100);

var Picker = Reflux.createStore({

  init: function () {
    this.listenTo(actions.pickColor, this._pickColor);
  },

  getState: function () {
    return state;
  },

  _pickColor: function (id) {
    state.activeId = id;
    state.color = AppStore.getState().colors[id].toHex();
    actions.openWindow('colorpicker');
    this.trigger(state);
  },

  // bound to the React-ColorPicker
  onChange: function (color) {
    state.color = color.toHex();
    if (state.activeId === null) {
      return;
    }
    setColor(state.activeId, color);
  }

});

module.exports = Picker;
