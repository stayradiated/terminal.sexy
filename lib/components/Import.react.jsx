var React = require('react');
var termcolors = require('termcolors');
var AppActions = require('../actions/AppActions');

var Import = React.createClass({

  handleClick: function () {
    var type = this.refs.select.getDOMNode().value;
    var text = this.refs.textarea.getDOMNode().value;
    var colors = termcolors[type].import(text);
    colors = termcolors.defaults.fill(colors);
    AppActions.setAllColors(colors);
  },

  render: function () {
    return (
      <div className='import'>
        <select ref='select' defaultValue='xresources'>
          <option value='iterm'>iTerm2</option>
          <option value='termite'>Termite</option>
          <option value='url'>URL</option>
          <option value='xresources'>Xresources</option>
        </select>
        <button onClick={this.handleClick}>Import</button>
        <div className='textarea'>
          <textarea spellCheck='false' className='bg-bg fg-fg' ref='textarea' />
        </div>
      </div>
    );
  }

});

module.exports = Import;
