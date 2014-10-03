'use strict';

var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var GoldenLayout = require('../vendor/goldenlayout.min.js');

var actions = require('../actions');
var LocalStore = require('../utils/local');

var Editor = require('../components/editor.react');
var Import = require('../components/import.react');
var Export = require('../components/export.react');
var Template = require('../components/template.react');
var SchemeBrowser = require('../components/schemeBrowser.react');
var TemplateBrowser = require('../components/templateBrowser.react');
var ColorPicker = require('../components/colorPicker.react');
var Random = require('../components/random.react');
var Settings = require('../components/settings.react');

var STORAGE_ID = 'window::store';

var components = {

  editor: function () {
    return {
      component: new Editor(),
      title: 'Editor'
    };
  },

  import: function () {
    return {
      component: new Import(),
      title: 'Import',
    };
  },

  export: function () {
    return {
      component: new Export(),
      title: 'Export',
    };
  },

  schemes: function () {
    return {
      component: new SchemeBrowser(),
      title: 'Scheme Browser',
    };
  },

  templates: function () {
    return {
      component: new TemplateBrowser(),
      title: 'Template Browser',
    };
  },

  template: function (state) {
    return {
      component: new Template(state),
      id: 'template-' + state.path,
      title: 'Template: ' + state.path,
    };
  },

  colorpicker: function () {
    return {
      component: new ColorPicker(),
      title: 'Color Picker',
    };
  },

  random: function () {
    return {
      component: new Random(),
      title: 'Randomiser',
    };
  },

  settings: function () {
    return {
      component: new Settings(),
      title: 'Settings',
    };
  },

};

var config = LocalStore.load(STORAGE_ID) || {
  settings: {
    showPopoutIcon: false,
    showMaximiseIcon: false,
    hasHeaders: true,
  },
  content: [{
    type: 'row',
    content: [{
      type: 'stack',
      width: 20,
      content: [{
        type: 'component',
        id: 'editor',
        componentName: 'editor',
      },{
        type: 'component',
        id: 'settings',
        componentName: 'settings',
      }]
    },{
      type: 'column',
      width: 30,
      content:[{
        type: 'stack',
        content: [{
          type: 'component',
          id: 'colorpicker',
          componentName: 'colorpicker',
        },{
          type: 'component',
          id: 'random',
          componentName: 'random',
        }]
      },{
        type: 'stack',
        content: [{
          type: 'component',
          id: 'import',
          componentName: 'import',
        },{
          type: 'component',
          id: 'export',
          componentName: 'export',
        }]
      }]
    },{
      type: 'column',
      content: [{
        type: 'component',
        id: 'template',
        componentName: 'template',
        componentState: { path: '/vim/hybrid/javascript' }
      },{
        type: 'stack',
        content: [{
          id: 'templates',
          type: 'component',
          componentName: 'templates',
        },{
          id: 'schemes',
          type: 'component',
          componentName: 'schemes',
        }]
      }]
    }]
  }]
};

config.dimensions = {
  borderWidth: 5,
  headerHeight: 25,
};

var WindowStore = Reflux.createStore({

  init: function () {
    this.listenTo(actions.openWindow, this._open);
    this.listenTo(actions.resetLayout, this._reset);
  },

  setup: function (el) {
    this.layout = new GoldenLayout(config, el);
    this._register(this.layout);
    this.layout.init();
    this.trigger(this.layout);
  },

  _reset: function () {
    LocalStore.clear(STORAGE_ID);
  },

  _open: function (id, state) {
    var items = this.layout.root.getItemsById(id);

    for (var i = 0, len = items.length; i < len; i += 1) {
      var item = items[i];
      if (_.isEqual(item.container.getState(), state)) {
        var parent = item.parent;
        if (parent.isStack) {
          parent.setActiveContentItem(item);
        }
        return;
      }
    }

    this.layout.root.contentItems[0].addChild({
      id: id,
      type: 'component',
      componentName: id,
      componentState: state,
    });
  },

  _register: function (layout) {
    _.each(components, function (value, key) {
      layout.registerComponent(key, function (container, componentState) {
        var component = value(componentState);
        container.setTitle(component.title);
        React.renderComponent(component.component, container.getElement()[0]);
      });
    });
    layout.on('stateChanged', function () {
      LocalStore.save(STORAGE_ID, layout.toConfig());
    });
  }

});

module.exports = WindowStore;
