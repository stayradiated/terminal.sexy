var $ = require('jquery');
var React = require('react');
var App = require('./components/App.react');

$(function () {
  React.renderComponent(<App />, document.body);
});
