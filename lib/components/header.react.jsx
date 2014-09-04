'use strict';

var React = require('react');

var actions = require('../actions');

var Header = React.createClass({

  open: function (name) {
    actions.openWindow(name);
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <header className='header foreground-fg background-subtle'>
        <h1>terminal.sexy</h1>
        <ul>
          <li onClick={this.open.bind(this, 'editor')}>Editor</li>
          <li onClick={this.open.bind(this, 'templates')}>Templates</li>
          <li onClick={this.open.bind(this, 'schemes')}>Schemes</li>
          <li onClick={this.open.bind(this, 'random')}>Random</li>
          <li onClick={this.open.bind(this, 'settings')}>Settings</li>
          <div className='seperator' />
          <li onClick={this.open.bind(this, 'import')}>Import</li>
          <li onClick={this.open.bind(this, 'export')}>Export</li>
        </ul>
      </header>
      /* jshint ignore: end */
    );
  }

});

module.exports = Header;
