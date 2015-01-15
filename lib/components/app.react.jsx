'use strict';

var $ = require('jquery');
var React = require('react');

var Header = require('./header.react');
var WindowStore = require('../stores/window');
var StyleSheet = require('./stylesheet.react');

var App = React.createClass({

  componentDidMount: function () {
    WindowStore.setup($(this.refs.layout.getDOMNode()));
  },

  render: function () {
    return (
      <div className='app'>
        <Header />
        <div ref="layout" className="layout-container"></div>
        <StyleSheet />
      </div>
    );
  }

});

module.exports = App;
