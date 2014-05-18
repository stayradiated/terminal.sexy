var React = require('react');
var TermColors = require('termcolors');

var Importer = React.createClass({

  handleClick: function () {
    var type = this.refs.select.getDOMNode().value;
    var text = this.refs.textarea.getDOMNode().value;
    var colors = TermColors[type].import(text);
    this.props.onImport(colors);
  },

  render: function () {
    return (
      <div className='importer'>
        <select ref='select' defaultValue='xresources'>
          <option value='iterm'>iTerm2</option>
          <option value='termite'>Termite</option>
          <option value='url'>URL</option>
          <option value='xresources'>Xresources</option>
        </select>
        <textarea ref='textarea' />
        <button onClick={this.handleClick}>Import</button>
      </div>
    );
  }

});

module.exports = Importer;
