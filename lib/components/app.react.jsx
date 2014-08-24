'use strict';

var React = require('react');
var ReactWM = require('reactwm');

var Header = require('./header.react');
var WindowStore = require('../stores/window');
var StyleSheet = require('./stylesheet.react');

var App = React.createClass({

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='app'>
        <Header />
        <ReactWM manager={WindowStore.getManager()} />
        <StyleSheet />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = App;
