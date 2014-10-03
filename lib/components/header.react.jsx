'use strict';

var $ = require('jquery');
var React = require('react');
var Reflux = require('reflux');

var actions = require('../actions');
var WindowStore = require('../stores/window');

var Header = React.createClass({

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

  render: function () {
    return (
      /* jshint ignore: start */
      <header className='header foreground-fg background-desktop'>
        <h1 onClick={actions.resetLayout}>terminal.sexy</h1>
        <ul ref='menu'>
          <li data-id='editor'>Editor</li>
          <li data-id='templates'>Templates</li>
          <li data-id='schemes'>Schemes</li>
          <li data-id='random'>Random</li>
          <li data-id='settings'>Settings</li>
          <li data-id='import'>Import</li>
          <li data-id='export'>Export</li>
        </ul>
      </header>
      /* jshint ignore: end */
    );
  },

});

module.exports = Header;
