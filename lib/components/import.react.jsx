'use strict';

var React = require('react');
var termcolors = require('termcolors');

var actions = require('../actions');

var Import = React.createClass({

  handleClick: function () {
    var type = this.refs.select.getDOMNode().value;
    var text = this.refs.textarea.getDOMNode().value;
    var colors = termcolors[type].import(text);
    colors = termcolors.defaults.fill(colors);
    actions.setAllColors(colors);
  },

  render: function () {
    return (
      <div className='import'>
        <div className="control">
          <label>Format:</label>
          <select ref='select' defaultValue='xresources'>
            <option value='iterm'>iTerm2</option>
            <option value='termite'>Termite</option>
            <option value='terminalapp'>Terminal.app</option>
            <option value='xresources'>Xresources</option>
          </select>
        </div>
        <textarea spellCheck='false' className='background-bg' ref='textarea' />
        <div className='buttons'>
          <button type='button' onClick={this.handleClick} className='button button-import'>Import</button>
        </div>
      </div>
    );
  }

});

module.exports = Import;
