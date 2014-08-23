var _ = require('lodash');
var Reflux = require('reflux');
var termcolors = require('termcolors');

var actions = require('../actions');
var url = require('../formats/url');

var state = {
  colors: url.import(location.hash)
};

if (state.colors === false) {
  state.colors = _.clone(termcolors.defaults.colors);
}

var AppStore = Reflux.createStore({

  init: function () {
    this.listenTo(actions.setAllColors, this._setAllColors);
    this.listenTo(actions.setColor, this._setColor);
  },

  getState: function () {
    return state;
  },

  _update: function () {
    window.history.replaceState(null, '', '#' + url.export(state.colors));
    this.trigger(state);
  },

  _setAllColors: function (colors) {
    state.colors = colors;
    this._update();
  },

  _setColor: function (id, color) {
    state.colors[id] = color;
    this._update();
  }

});

module.exports = AppStore;
