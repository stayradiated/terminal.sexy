var $ = require('jquery');
var _ = require('lodash');
var React = require('react');
var ReactWM = require('reactwm');
var TermColors = require('termcolors');
var tiny = require('tinytinycolor');

var Importer = require('./components/importer');
var Exporter = require('./components/exporter');
var Editor = require('./components/editor');
var Template = require('./components/template');

var windows = new ReactWM.Manager(
  JSON.parse(localStorage.sexy || '[]')
);

$(function () {
  React.renderComponent(<ReactWM manager={windows} />, $('.content')[0]);

  $.get('templates/columns.html').then(function (content) {
    windows.open(<Template content={content} />, {
      id: 'template',
      title: 'Template > Columns',
      width: 600,
      height: 800,
      x: 940,
      y: 20
    });
  });
});

var save = _.throttle(function () {
  localStorage.sexy = windows.toString();
}, 1000);

windows.on('change', save);
windows.on('change:windows', save);

var _oldStyles = null;
var injectStyles = function (rule) {
  if (_oldStyles) _oldStyles.remove();
  _oldStyles = $("<div />", {
    html: '&shy;<style>' + rule + '</style>', 
  }).appendTo("body");    
  return _oldStyles;
};

var state = {};

var importColors = function (colors) {
  state.colors = TermColors.defaults.fill(colors);
  render();
};

var render = function () {

  if (state.colors) {
    var css = TermColors.css.export(state.colors);
    var bodyBg;
    if (state.colors.background.toHsl().l > 0.5) {
      bodyBg = tiny.darken(state.colors.background);
    } else {
      bodyBg = tiny.lighten(state.colors.background);
    }

    injectStyles(css + [
      '.window {background: ' + state.colors.background.toHexString() + ' !important;}',
      '.window .title{color: ' + state.colors.foreground.toHexString() + ' !important;}',
      'body {background: ' + bodyBg.toHexString() + ' !important;}',
    ].join('\n'));
  }

  windows.open(<Importer onImport={importColors}/>, {
    id: 'importer',
    title: 'Importer',
    width: 400,
    height: 400,
    x: 20,
    y: 20
  });

  windows.open(<Exporter colors={state.colors}/>, {
    id: 'exporter',
    title: 'Exporter',
    width: 400,
    height: 400,
    x: 20,
    y: 440
  });

  windows.open(<Editor />, {
    id: 'editor', 
    title: 'Editor',
    width: 480,
    height: 800,
    x: 440,
    y: 20
  });

};

render();
