var $ = require('jquery');
var React = require('react');
var App = require('./components/app.react');

$(function () {
  React.renderComponent(<App />, document.body);
});
