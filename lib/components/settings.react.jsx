'use strict';

var React = require('react');

var AppStore = require('../stores/app');
var actions = require('../actions');

var Settings = React.createClass({

  save: function () {
    actions.setFont(
      this.refs.fontName.getDOMNode().value,
      this.refs.fontSize.getDOMNode().value
    );
  },

  render: function () {
    var state = AppStore.getState().font;

    return (
      /* jshint ignore: start */
      <div className='settings'>
        <div className='control'>
          <label>Font Name</label>
          <input className='background-subtle' defaultValue={state.name} ref='fontName'/>
        </div>
        <div className='control'>
          <label>Font Size</label>
          <input className='background-subtle' defaultValue={state.size} ref='fontSize'/>
        </div>
        <div onClick={this.save} className='button'>Save</div>
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Settings;
