'use strict';

var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');

var actions = require('../actions');
var WindowStore = require('../stores/window');

var Header = React.createClass({

  render: function () {
    return (
      <header className='header foreground-fg background-desktop'>
        <h1 className='foreground-3'>terminal.sexy</h1>
        <div className='sections'>
          <div className='section' onClick={_.partial(actions.openWindow, 'about')}>
            <span>About</span>
          </div>
          <div className='section'>
            <span>Open Window</span>
            <ul className='background-desktop' ref='menu'>
              <li onClick={_.partial(actions.openWindow, 'editor')}>Editor</li>
              <li onClick={_.partial(actions.openWindow, 'colorpicker')}>Color Picker</li>
              <hr className='background-subtle' />
              <li onClick={_.partial(actions.openWindow, 'templates')}>Template Browser</li>
              <li onClick={_.partial(actions.openWindow, 'schemes')}>Scheme Browser</li>
              <hr className='background-subtle' />
              <li onClick={_.partial(actions.openWindow, 'save')}>Save Scheme</li>
              <li onClick={_.partial(actions.openWindow, 'import')}>Import Scheme</li>
              <li onClick={_.partial(actions.openWindow, 'export')}>Export Scheme</li>
              <hr className='background-subtle' />
              <li onClick={_.partial(actions.openWindow, 'importTemplate')}>Import Template</li>
              <hr className='background-subtle' />
              <li onClick={_.partial(actions.openWindow, 'settings')}>Settings</li>
              <li onClick={_.partial(actions.openWindow, 'random')}>Randomiser</li>
            </ul>
          </div>
          <div className='section'>
            <span>Workspace Layout</span>
            <ul className='background-desktop' ref='menu'>
              <li onClick={actions.resetLayout}>Reset Layout</li>
            </ul>
          </div>
        </div>
      </header>
    );
  },

});

module.exports = Header;
