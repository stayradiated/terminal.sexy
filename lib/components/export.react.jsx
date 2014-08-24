'use strict';

var React = require('react');
var termcolors = require('termcolors');

var AppStore = require('../stores/app');

termcolors.json = require('../formats/json');

var Export = React.createClass({

  getInitialState: function () {
    return {
      text: ''
    };
  },

  handleClick: function () {
    var colors = AppStore.getState().colors;
    var type = this.refs.select.getDOMNode().value;
    this.setState({
      text: termcolors[type].export(colors)
    });
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='export'>
        <select ref='select' defaultValue='xresources'>
          <option value='gnome'>Gnome Terminal</option>
          <option value='guake'>Guake</option>
          <option value='iterm'>iTerm2</option>
          <option value='konsole'>Konsole</option>
          <option value='mintty'>MinTTY</option>
          <option value='putty'>Putty</option>
          <option value='terminator'>Terminator</option>
          <option value='termite'>Termite</option>
          <option value='xfce'>XFCE4 Terminal</option>
          <option value='xresources'>Xresources</option>
          <option value='json'>JSON</option>
        </select>
        <div onClick={this.handleClick} className='button'>Export</div>
        <div className='textarea'>
          <textarea value={this.state.text} readOnly spellCheck='false'
            className='background-bg' ref='textarea' />
        </div>
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Export;
