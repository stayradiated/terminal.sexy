var _ = require('lodash');
var ReactWM = require('reactwm');
var Signals = require('signals');
var AppStore = require('../stores/AppStore');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var LocalStore = require('../stores/LocalStore');

var Editor = require('../components/Editor.react');
var Import = require('../components/Import.react');
var Export = require('../components/Export.react');
var Template = require('../components/Template.react');
var SchemeBrowser = require('../components/SchemeBrowser.react');
var TemplateBrowser = require('../components/TemplateBrowser.react');

var STORAGE_ID = 'window::store';

var windows = {

  editor: {
    component: Editor,
    title: 'Editor',
    width: 460,
    height: 700
  },

  import: {
    component: Import,
    title: 'Import',
    width: 330,
    height: 330,
    x: 500
  },

  export: {
    component: Export,
    title: 'Export',
    width: 330,
    height: 330,
    x: 500,
    y: 370
  },

  schemes: {
    component: SchemeBrowser,
    title: 'Scheme Browser',
    width: 330,
    height: 330,
    x: 850
  },

  templates: {
    component: TemplateBrowser,
    title: 'Template Browser',
    width: 500,
    height: 200,
    x: 850,
    y: 370
  },

  template: function (template) {
    return {
      component: Template,
      id: 'template-' + template,
      title: 'Template: ' + template,
      width: 730,
      height: 580
    };
  }

};

var getWindow = function (id) {
  var _id = id.split('::');
  id = _id.splice(0, 1)[0];
  data = _id.join('::');

  var info = windows[id];

  if (_.isFunction(info)) {
    console.log('is function');
    info = info(data);
  }
  else if (_.isObject(info)) {
    console.log('is object');
    info = _.clone(info);
  }

  if (! _.isObject(info)) {
    return undefined;
  }

  console.log({
    id:id, 
    data:data,
    info:info
  });

  info.component = info.component({ key: data });

  return info;
};

var manager = (function () {
  var localData = LocalStore.load(STORAGE_ID);
  var manager = new ReactWM.Manager(localData);

  manager.openWindows().forEach(function (window) {
    window.setComponent(getWindow(window.id).component);
  });

  var _saveLayout = _.throttle(function () {
    LocalStore.save(STORAGE_ID, manager.toJSON());
  }, 500);

  manager.on('change', _saveLayout);
  manager.on('change:windows', _saveLayout);

  return manager;
}());

var WindowStore = Signals.convert({

  getManager: function () {
    return manager;
  },

  open: function (id) {
    console.log('opening window', id);
    var window = getWindow(id);
    console.log(window);
    var el = window.component;
    manager.open(id, el, window);
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
