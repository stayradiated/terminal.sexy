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
  },

  getState: function () {
    return state;
  },

  _setAllColors: function (colors) {
    state.colors = colors;
    window.history.replaceState(null, '', '#' + url.export(colors));
    this.trigger(state);
  },

});

module.exports = AppStore;
