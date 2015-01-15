'use strict';

var $ = require('jquery');
var React = require('react');

window.React = React;
window.$ = $;

var App = React.createFactory(require('./components/app.react'));

$(function () {
  React.render(App(), document.body);
});
