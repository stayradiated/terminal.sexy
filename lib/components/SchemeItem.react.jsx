var React = require('react');
var AppActions = require('../actions/AppActions');

var SchemeItem = React.createClass({

  handleClick: function () {
    AppActions.setAllColors(this.props.scheme.colors);
  },

  render: function () {
    return (
      <li className='scheme-item' onClick={this.handleClick}>
        <span className='name'>{this.props.scheme.name}</span>
        <span className='foreground-7 author'>{this.props.scheme.author}</span>
      </li>
    );
  }

});

module.exports = SchemeItem;
