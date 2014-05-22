var React = require('react');
var AppActions = require('../actions/AppActions');

var TemplateBrowserItem = React.createClass({

  handleClick: function () {
    AppActions.openWindow('template', {
      template: this.props.key
    });
  },

  render: function () {
    return (
      <div className='template-browser-item fg-fg' onClick={this.handleClick}>
        {this.props.key}
      </div>
    );
  }

});

module.exports = TemplateBrowserItem;
