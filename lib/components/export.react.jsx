var React = require('react');
var termcolors = require('termcolors');

var Export = React.createClass({

  getInitialState: function () {
    return {
      text: ''
    };
  },

  handleClick: function () {
    var type = this.refs.select.getDOMNode().value;
    console.log('exporting', type, this.props.colors);
    this.setState({
      text: termcolors[type].export(this.props.colors)
    });
  },

  render: function () {
    return (
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
        </select>
        <button onClick={this.handleClick}>Export</button>
        <div className='textarea'>
          <textarea value={this.state.text} readOnly spellCheck='false'
            className='bg-bg fg-fg' ref='textarea' />
        </div>
      </div>
    );
  }

});

module.exports = Export;
