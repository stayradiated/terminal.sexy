'use strict';

var React = require('react');
var termcolors = require('termcolors');
var saveAs = require('filesaver.js');

var AppStore = require('../stores/app');

termcolors.json = require('../formats/json');

var Export = React.createClass({

  getInitialState: function () {
    return {
      text: ''
    };
  },

  handleExport: function () {
    var type = this.refs.select.getDOMNode().value;
    if (! type) { return; }
    var colors = AppStore.getState().colors;
    this.setState({
      text: termcolors[type].export(colors)
    });
  },

  handleDownload: function () {
    saveAs(
      new Blob([this.state.text], {type: 'text/plain;charset=utf-8'}),
      'terminal-sexy.txt'
    );
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='export'>
        <div className="control">
          <label>Format:</label>
          <select ref='select' defaultValue='xresources'>
            <option value='chromeshell'>Chrome Secure Shell</option>
            <option value='gnome'>Gnome Terminal</option>
            <option value='guake'>Guake</option>
            <option value='iterm'>iTerm2</option>
            <option value='konsole'>Konsole</option>
            <option value='mintty'>MinTTY</option>
            <option value='putty'>Putty</option>
            <option value='terminalapp'>Terminal.app</option>
            <option value='terminator'>Terminator</option>
            <option value='termite'>Termite</option>
            <option value='xfce'>XFCE4 Terminal</option>
            <option value='xresources'>Xresources</option>
            <option value=''>-- OTHER --</option>
            <option value='textmate'>Textmate / Sublime Text</option>
            <option value='json'>JSON Scheme</option>
          </select>
        </div>
        <textarea value={this.state.text} readOnly spellCheck='false'
          className='background-bg' ref='textarea' />
        <div className='buttons'>
          <button type='button' onClick={this.handleExport} className='button button-export'>Export</button>
          <button type='button' onClick={this.handleDownload} className='button button-download'>Download</button>
        </div>
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Export;
