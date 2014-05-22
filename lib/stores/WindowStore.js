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
var Template = require('../components/Template.react');
var TemplateBrowser = require('../components/TemplateBrowser.react');

var manager = new ReactWM.Manager();

var WindowStore = Signals.convert({

  getManager: function () {
    return manager;
  },

  open: function (id, options) {
    var el = null;
    var win = {
      id: id,
      title: '',
      width: 200,
      height: 200,
      x: 20,
      y:20
    };

    switch (id) {

      case 'editor':
        el = new Editor();
        win.title = 'Editor';
        win.width = 460;
        win.height = 700;
        break;

      case 'import':
        el = new Import();
        win.title = 'Import';
        win.width = 330;
        win.height = 330;
        win.x = 500;
        break;

      case 'export':
        el = new Export();
        win.title = 'Export';
        win.width = 330;
        win.height = 330;
        win.x = 500;
        win.y = 370;
        break;

      case 'schemes':
        el = new Schemes();
        win.title = 'Schemes';
        win.width = 330;
        win.height = 330;
        win.x = 850;
        break;

      case 'templates':
        el = new TemplateBrowser();
        win.title = 'Template Browser';
        win.width = 500;
        win.height = 200;
        win.x = 850;
        win.y = 370;
        break;

      case 'template':
        el = new Template({ key: options.template });
        win.title = 'Template: ' + options.template;
        break;

      default:
        return;

    }

    manager.open(el, win);
  }

});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.OPEN_WINDOW:
      WindowStore.open(action.id, action.options);
      break;

    default:
      return true;
  }

  WindowStore.emit('change');

  return true;

});

module.exports = WindowStore;
