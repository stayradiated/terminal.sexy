var React = require('react');
var ReactWM = require('reactwm');

// components
var Header = require('./header');
var StyleSheet = require('./stylesheet');

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
