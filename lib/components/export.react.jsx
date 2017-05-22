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
    var type = this.refs.select.getDOMNode().value;
    var scheme = AppStore.getState().scheme;

    var filename
    switch(type) {
      case 'xshell':
        filename = scheme + '.xcs';
        break;
      case 'putty':
        filename = scheme + '.reg';
        break;
      case 'iterm':
        filename = scheme + '.itermcolors';
        break;
      default:
        filename = scheme + '.txt';
        break;
    }

    saveAs(
      new Blob([this.state.text], {type: 'text/plain;charset=utf-8'}),
      filename
    );
  },

  render: function () {
    return (
      <div className='export'>
        <div className="control">
          <label>Format:</label>
          <select ref='select' defaultValue='xresources'>
            <option value='alacritty'>Alacritty</option>
            <option value='chromeshell'>Chrome Secure Shell</option>
            <option value='gnome'>Gnome Terminal</option>
            <option value='guake'>Guake</option>
            <option value='iterm'>iTerm2</option>
            <option value='konsole'>Konsole</option>
            <option value='linux'>Linux console</option>
            <option value='mintty'>MinTTY</option>
            <option value='putty'>Putty</option>
            <option value='st'>Simple Terminal</option>
            <option value='terminalapp'>Terminal.app</option>
            <option value='terminator'>Terminator</option>
            <option value='termite'>Termite</option>
            <option value='xfce'>XFCE4 Terminal</option>
            <option value='xshell'>Xshell</option>
            <option value='xresources'>Xresources</option>
            <option value=''>-- OTHER --</option>
            <option value='textmate'>Sublime Text (experimental)</option>
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
    );
  }

});

module.exports = Export;
