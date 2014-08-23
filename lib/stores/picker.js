var Reflux = require('reflux');

var actions = require('../actions');

var state = {
  color: '#bada55'
};

var Picker = Reflux.createStore({

  init: function () {
    this.listenTo(actions.pickColor, this._pickColor);
  },

  getState: function () {
    return state;
  },

  _pickColor: function (color) {
    actions.openWindow('colorpicker');
    state.color = color;
    this.trigger(state);
  },

});

module.exports = Picker;
