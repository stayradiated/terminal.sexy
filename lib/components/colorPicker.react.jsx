'use strict';

var React = require('react');
var Reflux = require('reflux');
var ReactColorPicker = require('react-colorpicker');

var PickerStore = require('../stores/picker');
var actions = require('../actions');

var Picker = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentDidMount: function () {
    this.listenTo(PickerStore, this._onChange);
  },

  handleChange: function (color) {
    PickerStore.onChange(color);
  },

  render: function () {
    var state = PickerStore.getState();

    return (
      /* jshint ignore: start */
      <div>
      <ReactColorPicker
        key={state.origin}
        color={state.color}
        onChange={this.handleChange}
      />
      </div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = Picker;
