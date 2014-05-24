var React = require('react');
var AppActions = require('../actions/AppActions');

var TemplateBrowserItem = React.createClass({

  handleClick: function () {
    AppActions.openWindow('template::' + this.props.key);
  },

  render: function () {

    var sections = this.props.key.split('/');
    var name = sections.splice(sections.length - 1, 1);
    var category = sections.join('/') + '/';

    return (
      <div className='template-browser-item foreground-fg' onClick={this.handleClick}>
        <span className='category foreground-2'>{category}</span>
        <span className='name'>{name}</span>
      </div>
    );
  }

});

module.exports = TemplateBrowserItem;
