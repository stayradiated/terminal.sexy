'use strict';

var React = require('react');

var AppStore = require('../stores/app');
var actions = require('../actions');

var Settings = React.createClass({

  save: function () {
    actions.setFont({
      name: this.refs.fontName.getDOMNode().value,
      size: this.refs.fontSize.getDOMNode().value,
      line: this.refs.fontLine.getDOMNode().value,
    });
  },

  render: function () {
    var state = AppStore.getState().font;

    return (
      /* jshint ignore: start */
      <div className='settings'>
        <h4>Font</h4>
        <div className='control'>
          <label className="foreground-subtle">Font Name</label>
          <input defaultValue={state.name} ref='fontName'/>
        </div>
        <div className='control'>
          <label className="foreground-subtle">Font Size</label>
          <input defaultValue={state.size} ref='fontSize'/>
        </div>
        <div className='control'>
          <label className="foreground-subtle">Line Height</label>
          <input defaultValue={state.line} ref='fontLine'/>
        </div>
        <button type="button" onClick={this.save} className='button'>Save</button>
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Settings;
