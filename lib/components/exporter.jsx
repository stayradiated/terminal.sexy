var React = require('react');
var TermColors = require('termcolors');

var Exporter = React.createClass({

  getInitialState: function () {
    return {
      text: ''
    };
  },

  handleClick: function () {
    var type = this.refs.select.getDOMNode().value;
    this.setState({
      text: TermColors[type].export(this.props.colors)
    });
  },

  render: function () {
    console.log(this.props.colors);
    return (
      <div className='exporter'>
        <h2>Exporter</h2>
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
        </select>
        <textarea ref='textarea' value={this.state.text} readOnly />
        <button onClick={this.handleClick}>Export</button>
      </div>
    );
  }

});

module.exports = Exporter;
