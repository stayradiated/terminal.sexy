var React = require('react');
var ReactWM = require('reactwm');
var AppStore = require('../stores/AppStore');
var WindowStore = require('../stores/WindowStore');
var Header = require('./Header.react');
var StyleSheet = require('./Stylesheet.react');

var getAppState = function () {
  return {
    manager: WindowStore.getManager(),
    colors: AppStore.getColors()
  };
};

var App = React.createClass({

  getInitialState: function () {
    return getAppState();
  },

  componentDidMount: function () {
    AppStore.on('change', this._onChange);
  },

  componentWillUnmount: function () {
    AppStore.off('change', this._onChange);
  },

  render: function () {
    console.log(this.state.colors);
    return (
      <div className='app'>
        <Header />
        <ReactWM manager={this.state.manager} />
        <StyleSheet colors={this.state.colors} />
      </div>
    );
  },

  _onChange: function () {
    this.setState(getAppState());
  }

});

module.exports = App;
