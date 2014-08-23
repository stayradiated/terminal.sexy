var React = require('react');

var TemplateStore = require('../stores/template');

var Template = React.createClass({

  propTypes: {
    path: React.PropTypes.string.isRequired
  },

  componentDidMount: function () {
    var self = this;
    TemplateStore.load(this.props.path).then(function () {
      self.forceUpdate();
    } );
  },

  render: function () {
    var content = TemplateStore.get(this.props.path);

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
