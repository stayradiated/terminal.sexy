'use strict';

var _ = require('lodash');
var Reflux = require('reflux');
var Colr = require('colr');
var termcolors = require('termcolors');

var LocalStore = require('../utils/local');
var SchemeStore = require('./scheme');
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
  state.colors = SchemeStore.importScheme({
    foreground: '#c5c8c6',
    background: '#1d1f21',
    color: [
      '#282a2e',
      '#a54242',
      '#8c9440',
      '#de935f',
      '#5f819d',
      '#85678f',
      '#5e8d87',
      '#707880',
      '#373b41',
      '#cc6666',
      '#b5bd68',
      '#f0c674',
      '#81a2be',
      '#b294bb',
      '#8abeb7',
      '#c5c8c6'
    ]
  }).colors;
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
