'use strict';

var React = require('react');

var actions = require('../actions');
var AppStore = require('../stores/app');
var PickerStore = require('../stores/picker');

var Settings = React.createClass({

  getInitialState: function () {
    return {
      font: AppStore.getState().font,
      picker: PickerStore.getSettings(),
    };
  },

  save: function () {
    actions.setFont({
      name: this.refs.fontName.getDOMNode().value,
      size: this.refs.fontSize.getDOMNode().value,
      line: this.refs.fontLine.getDOMNode().value,
      web: this.refs.fontWeb.getDOMNode().checked,
    });
    actions.setPicker({
      throttle: parseInt(this.refs.pickerThrottle.getDOMNode().value, 10),
    });
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='settings'>
        <h4>Font</h4>
        <div className='control'>
          <label className="foreground-subtle">Font Name</label>
          <input type='text' defaultValue={this.state.font.name} ref='fontName'/>
        </div>
        <div className='control'>
          <label className="foreground-subtle">Font Size</label>
          <input type='text' defaultValue={this.state.font.size} placeholder='14px' ref='fontSize'/>
        </div>
        <div className='control'>
          <label className="foreground-subtle">Line Height</label>
          <input type='text' defaultValue={this.state.font.line} placeholder='21px' ref='fontLine'/>
        </div>
        <div className='control' title='Dowload the font from Google Web Fonts'>
          <label className="foreground-subtle">Web Font</label>
          <span className='checkbox'>
            <input type='checkbox' defaultChecked={this.state.font.web} ref='fontWeb'/>
            <span />
          </span>
        </div>
        <h4>Color Picker</h4>
        <div className='control' title='How often to update the stylesheet when using the colorpicker'>
          <label className="foreground-subtle">Throttle (ms)</label>
          <input type='text' defaultValue={this.state.picker.throttle} ref='pickerThrottle'/>
        </div>
        <button type="button" onClick={this.save} className='button'>Save</button>
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Settings;
