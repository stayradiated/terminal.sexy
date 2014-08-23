var React = require('react');
var TemplateStore = require('../stores/template');

var Template = React.createClass({

  componentDidMount: function () {
    var self = this;
    TemplateStore.load(this.props.key).then(function () {
      self.forceUpdate();
    } );
  },

  render: function () {
    var content = TemplateStore.get(this.props.key);

    return (
      /* jshint ignore: start */
      <div className='template'>
        <pre className='text' dangerouslySetInnerHTML={{__html: content}} />
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = Template;
