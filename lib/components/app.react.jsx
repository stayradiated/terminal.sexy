var React = require('react');
var ReactWM = require('reactwm');
var AppStore = require('../stores/AppStore');
var Header = require('./header.react');
var StyleSheet = require('./stylesheet.react');

var App = React.createClass({

  getInitialState: function () {
    return {
      manager: new ReactWM.Manager()
    };
  },

  render: function () {
    return (
      <div className='app'>
        <Header />
        <ReactWM manager={this.state.manager} />
        <StyleSheet />
      </div>
    );
  }

});

module.exports = App;
