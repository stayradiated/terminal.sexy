var React = require('react');
var TemplateStore = require('../stores/TemplateStore');
var TemplateBrowserItem = require('./TemplateBrowserItem.react');

var getTemplateBrowserState = function () {
  return {
    templates: TemplateStore.availableTemplates()
  };
};

var TemplateBrowser = React.createClass({

  getInitialState: function () {
    return getTemplateBrowserState();
  },

  componentDidMount: function () {
    TemplateStore.on('change', this._onChange);
  },

  componentWillUnmount: function () {
    TemplateStore.off('change', this._onChange);
  },

  render: function () {

    var templates = this.state.templates.map(function (id) {
      return <TemplateBrowserItem key={id} />;
    });

    return (
      <div className='template-browser'>
        {templates}
      </div>
    );
  },

  _onChange: function () {
    this.setState(getTemplateBrowserState());
  }

});

module.exports = TemplateBrowser;
