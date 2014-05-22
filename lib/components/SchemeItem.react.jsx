var React = require('react');
var AppActions = require('../actions/AppActions');

var SchemeItem = React.createClass({

  handleClick: function () {
    AppActions.setAllColors(this.props.scheme.colors);
  },

  render: function () {
    return (
      <li className='scheme-item' onClick={this.handleClick}>
        <span className='fg-fg name'>{this.props.scheme.name}</span>
        <span className='fg-7 author'>{this.props.scheme.author}</span>
      </li>
    );
  }

});

module.exports = SchemeItem;