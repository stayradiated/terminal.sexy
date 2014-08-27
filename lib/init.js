'use strict';

var $ = require('jquery');
var React = require('react');
var App = require('./components/app.react');

// trigger react dev tools
window.React = React;

$(function () {
  React.renderComponent(new App(), document.body);
});
