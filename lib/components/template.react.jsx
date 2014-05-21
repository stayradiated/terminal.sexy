var React = require('react');

var Template = React.createClass({

  render: function () {
    return (
      <div className='template'>
        <pre className='text' dangerouslySetInnerHTML={{__html: this.props.content}} />
      </div>
    );
  }

});

module.exports = Template;
