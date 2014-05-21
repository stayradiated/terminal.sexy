var _ = require('lodash');
var Signals = require('signals');
var termcolors = require('termcolors');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var _colors = _.clone(termcolors.defaults.colors);

var AppStore = Signals.convert({

  getColors: function () {
    return _colors;
  }

});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.SET_ALL_COLORS:
      _colors = action.colors;
      break;

    default:
      return true;
  }

  AppStore.emit('change');

  return true;

});

module.exports = AppStore;
