var _ = require('lodash');
var ReactWM = require('reactwm');
var Signals = require('signals');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var Editor = require('../components/editor.react');
var Import = require('../components/import.react');

var manager = new ReactWM.Manager();

var WindowStore = Signals.convert({

  getManager: function () {
    return manager;
  },

  open: function (id) {
    switch (id) {

      case 'editor':
        manager.open(new Editor(), {
          id: id,
          title: 'Editor',
          width: 460,
          height: 700,
          x: 20,
          y: 20
        });
        break;

      case 'import':
        manager.open(new Import(), {
          id: id,
          title: 'Import',
          width: 330,
          height: 330,
          x: 500,
          y: 20
        });
        break;
    }
  }

});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.OPEN_WINDOW:
      WindowStore.open(action.id);
      break;

    default:
      return true;
  }

  WindowStore.emit('change');

  return true;

});

module.exports = WindowStore;
