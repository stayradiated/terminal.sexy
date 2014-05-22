var _ = require('lodash');
var ReactWM = require('reactwm');
var Signals = require('signals');
var AppStore = require('../stores/AppStore');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var Editor = require('../components/Editor.react');
var Import = require('../components/Import.react');
var Export = require('../components/Export.react');
var Schemes = require('../components/Schemes.react');

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

      case 'export':
        manager.open(new Export(), {
          id: id,
          title: 'Export',
          width: 330,
          height: 330,
          x: 500,
          y: 380
        });
        break;

      case 'schemes':
        manager.open(new Schemes(), {
          id: id,
          title: 'Schemes',
          width: 330,
          height: 330,
          x: 850,
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
