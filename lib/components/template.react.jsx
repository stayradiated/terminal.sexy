'use strict';

var $ = require('jquery');
var React = require('react');

var TemplateStore = require('../stores/template');

var Template = React.createClass({

  propTypes: {
    path: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      background: 'bg',
      foreground: 'fg'
    };
  },

  componentDidMount: function () {
    var self = this;
    TemplateStore.load(this.props.path, function () {
      self.forceUpdate();
    });
  },

  render: function () {
    var content = TemplateStore.get(this.props.path);

    return (
      /* jshint ignore: start */
      <div className='template'>
        <pre className='text'
          dangerouslySetInnerHTML={{__html: content}}
          onMouseOver={this.handleMouseOver}
          ref='container'
        />
        <div className='status-bar background-desktop'>
          <div>Background: {this.state.background}</div>
          <div>Foreground: {this.state.foreground}</div>
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  handleMouseOver: function (event) {
    var classes = '';
    var target = event.target;
    var container = this.refs.container.getDOMNode();

    while (target !== container) {
      classes += target.className + ' ';
      target = target.parentNode;
    }

    var match;
    var foreground = 'fg';
    var background = 'bg';

    match = classes.match(/\bforeground-(\d+)\b/);
    if (match) {
      foreground = parseInt(match[1], 0);
    }

    match = classes.match(/\bbackground-(\d+)\b/);
    if (match) {
      background = parseInt(match[1], 10);
    }

    match = classes.match(/\bbold\b/);
    if (match && foreground !== 'fg' && foreground < 8) {
      foreground += 8;
    }

    this.setState({
      foreground: foreground,
      background: background
    });
  },

});

module.exports = Template;
