var React = require('react');
var TemplateStore = require('../stores/TemplateStore');

var Template = React.createClass({

  render: function () {
    var content = TemplateStore.get(this.props.key);

    return (
      <div className='template'>
        <pre className='text' dangerouslySetInnerHTML={{__html: content}} />
      </div>
    );
  }

});

module.exports = Template;
