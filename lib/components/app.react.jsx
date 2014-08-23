var React = require('react');
var Reflux = require('reflux');
var ReactWM = require('reactwm');

var AppStore = require('../stores/app');

var Header = require('./header.react');
var WindowStore = require('../stores/window');
var StyleSheet = require('./stylesheet.react');

var App = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function () {
    return {
      manager: WindowStore.getManager(),
      colors: AppStore.getState().colors
    };
  },

  componentDidMount: function () {
    this.listenTo(AppStore, this._onChange);
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='app'>
        <Header />
        <ReactWM manager={this.state.manager} />
        <StyleSheet colors={this.state.colors} />
      </div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  }

});

module.exports = App;
