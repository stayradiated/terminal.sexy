var React = require('react');
var AppActions = require('../actions/AppActions');

var Header = React.createClass({

  open: function (name) {
    AppActions.openWindow(name);
  },

  render: function () {
    return (
      <header className='header'>
        <h1>terminal.sexy</h1>
        <button onClick={this.open.bind(this, 'editor')}>Editor</button>
      </header>
    );
  }

});

module.exports = Header;
