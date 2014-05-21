var _ = require('lodash');
var Signals = require('signals');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var state = {};

var AppStore = Signals.convert({

  openWindow: function (id) {
    console.log('Want to open window:', id);
  }

});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.OPEN_WINDOW:
      AppStore.openWindow(action.id);
      break;

    default:
      return true;
  }

  AppStore.emit('change');

  return true;

});

module.exports = AppStore;
