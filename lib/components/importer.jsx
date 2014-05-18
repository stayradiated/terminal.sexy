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
        <h2>Importer</h2>
        <select ref='select'>
          <option value='xresources'>Xresources</option>
          <option value='url'>URL</option>
        </select>
        <textarea ref='textarea' />
        <button onClick={this.handleClick}>Import</button>
      </div>
    );
  }

});

module.exports = Importer;
