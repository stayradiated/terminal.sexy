'use strict';

var React = require('react/addons');
var Colr = require('colr');

var actions = require('../actions');

var EditorBlock = React.createClass({

  propTypes: {
    label: React.PropTypes.string.isRequired,
    color: React.PropTypes.instanceOf(Colr).isRequired
  },

  getInitialState: function () {
    return { focused: false };
  },

  render: function () {
    var contrast = this.props.color.toGrayscale();

    var classes = React.addons.classSet({
      block: true,
      dark: contrast < 128,
      light: contrast >= 128,
      focus: this.state.focused
    });

    return (
      <div key={this.props.label} className={classes}>
        <input
          className='hidden' ref='input'
          onFocus={this.handleFocus} onBlur={this.handleBlur} />
        <div
          className={'color background-'+this.props.label}
          onClick={this.handleClick} >
          <div className='label'>{this.props.label}</div>
          <div className='hex'>{this.props.color.toHex()}</div>
        </div>
      </div>
    );
  },

  handleClick: function () {
    actions.pickColor(this.props.key);
    this.refs.input.getDOMNode().focus();
  },

  handleFocus: function () {
    this.setState({
      focused: true
    });
  },

  handleBlur: function () {
    this.setState({
      focused: false
    });
  },

});

module.exports = EditorBlock;
