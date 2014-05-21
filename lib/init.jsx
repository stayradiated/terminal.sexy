var $ = require('jquery');
var React = require('react');
var App = require('./components/app');

$(function () {
  React.renderComponent(<App />, document.body);
});
