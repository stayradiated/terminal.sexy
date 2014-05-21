var React = require('react');
var AppActions = require('../actions/AppActions');

var Header = React.createClass({

  open: function (name) {
    AppActions.openWindow(name);
  },

  render: function () {
    return (
      <header className='header fg-fg bg-bg'>
        <h1>terminal.sexy</h1>
        <ul>
          <li onClick={this.open.bind(this, 'export')}>Export</li>
          <li onClick={this.open.bind(this, 'import')}>Import</li>
          <li onClick={this.open.bind(this, 'editor')}>Editor</li>
        </ul>
      </header>
    );
  }

});

module.exports = Header;
