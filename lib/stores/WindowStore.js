var _ = require('lodash');
var ReactWM = require('reactwm');
var Signals = require('signals');
var AppStore = require('../stores/AppStore');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var Editor = require('../components/editor.react');
var Import = require('../components/import.react');
var Export = require('../components/export.react');

var manager = new ReactWM.Manager();

var WindowStore = Signals.convert({

  getManager: function () {
    return manager;
  },

  open: function (id) {
    switch (id) {

      case 'editor':
        manager.open(new Editor({colors: AppStore.getColors()}), {
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

      case 'export':
        manager.open(new Export({colors: AppStore.getColors()}), {
          id: id,
          title: 'Export',
          width: 330,
          height: 330,
          x: 500,
          y: 400
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
