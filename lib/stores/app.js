'use strict';

var _ = require('lodash');
var Reflux = require('reflux');
var Colr = require('colr');
var termcolors = require('termcolors');

var LocalStore = require('../utils/local');
var actions = require('../actions');
var url = require('../formats/url');

var STORAGE_ID = 'app::settings';

var state = {
  colors: url.import(location.hash),
  font: {
    name: 'fira mono',
    size: '14px',
  }
};

var localState = LocalStore.load(STORAGE_ID);

if (typeof localState === 'object') {
  if (localState.hasOwnProperty('font')) {
    state.font = localState.font;
  }
}

if (state.colors === false) {
  state.colors = _.clone(termcolors.defaults.colors);
}

var AppStore = Reflux.createStore({

  init: function () {
    this.listenTo(actions.setAllColors, this._setAllColors);
    this.listenTo(actions.setColor, this._setColor);
    this.listenTo(actions.setFont, this._setFont);
  },

  getState: function () {
    return state;
  },

  _setAllColors: function (colors) {
    state.colors = colors;
    updateUrl();
    this.trigger(state);
  },

  _setColor: function (id, color) {
    state.colors[id] = color;
    updateUrl();
    this.trigger(state);
  },

  _setFont: function (name, size) {
    state.font.name = name;
    state.font.size = size;
    saveState();
    this.trigger(state);
  },

});

function saveState () {
  LocalStore.save(STORAGE_ID, {
    font: state.font,
  });
}

function updateUrl () {
  window.history.replaceState(null, '', '#' + url.export(state.colors));
}

module.exports = AppStore;
