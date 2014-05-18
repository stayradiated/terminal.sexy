var $ = require('jquery');
var React = require('react');
var ReactWM = require('reactwm');
var TermColors = require('termcolors');

var Importer = require('./components/importer');
var Exporter = require('./components/exporter');

var windows = new ReactWM.Manager();

$(function () {
  React.renderComponent(<ReactWM manager={windows} />, $('.content')[0]);
});

window.windows = windows;

var state = {};

var importColors = function (colors) {
  state.colors = TermColors.defaults.fill(colors);
  render();
};

var render = function () {

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
    x: 440,
    y: 20
  });

};

render();
