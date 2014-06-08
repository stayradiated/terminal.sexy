var React = require('react');
var Ranger = require('react-ranger');
var TemplateStore = require('../stores/TemplateStore');
var AppActions = require('../actions/AppActions');

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

  handleExecute: function (item) {
    console.log(item.path);
    AppActions.openWindow('template::' + item.path);
  },

  render: function () {
    return (
      <Ranger
        data={Ranger.parseList(this.state.templates)}
        onExecute={this.handleExecute}
        />
    );
  },

  _onChange: function () {
    this.setState(getTemplateBrowserState());
  }

});

module.exports = TemplateBrowser;
