'use strict';

var $ = require('jquery');
var React = require('react');
var Reflux = require('reflux');

var actions = require('../actions');
var WindowStore = require('../stores/window');

var Header = React.createClass({

  /*
  mixins: [Reflux.ListenerMixin],

  componentDidMount: function () {
    this.listenTo(WindowStore, this.createDragSource);
  },

  createDragSource: function (layout) {
    var $menu = $(this.refs.menu.getDOMNode());
    $menu.find('li').each(function (_, el) {
      var $el = $(el);
      var id = $el.data('id');
      layout.createDragSource($el, {
        type: 'component',
        componentName: id,
        id: id,
      });
    });
  },
  */

  open: function (id) {
    actions.openWindow(id);
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <header className='header foreground-fg background-desktop'>
        <h1 className='foreground-3'>terminal.sexy</h1>
        <div className='sections'>
          <div className='section'>
            <span onClick={this.open.bind(this, 'about')}>About</span>
          </div>
          <div className='section'>
            <span>Open Window</span>
            <ul className='background-desktop' ref='menu'>
              <li onClick={this.open.bind(this, 'editor')}>Editor</li>
              <li onClick={this.open.bind(this, 'colorpicker')}>Color Picker</li>
              <li onClick={this.open.bind(this, 'templates')}>Templates</li>
              <li onClick={this.open.bind(this, 'schemes')}>Schemes</li>
              <li onClick={this.open.bind(this, 'random')}>Randomiser</li>
              <li onClick={this.open.bind(this, 'settings')}>Settings</li>
              <li onClick={this.open.bind(this, 'import')}>Import Scheme</li>
              <li onClick={this.open.bind(this, 'export')}>Export Scheme</li>
              <li onClick={this.open.bind(this, 'importTemplate')}>Import Template</li>
            </ul>
          </div>
        </div>
      </header>
      /* jshint ignore: end */
    );
  },

});

module.exports = Header;
