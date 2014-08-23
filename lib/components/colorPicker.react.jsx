var React = require('react');
var Reflux = require('reflux');
var ReactColorPicker = require('react-colorpicker');

var Picker = require('../stores/picker');
var actions = require('../actions');

var ColorPicker = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentDidMount: function () {
    this.listenTo(Picker, this._onChange);
  },

  getInitialState: function () {
    return {
      color: Picker.getState().color
    };
  },

  handleChange: function (color) {
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <ReactColorPicker
        color={this.state.color}
        onChange={this.handleChange}
      />
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  }

});

module.exports = ColorPicker;
