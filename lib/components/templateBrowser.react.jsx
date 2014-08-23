var React = require('react');
var Reflux = require('reflux');
var Ranger = require('react-ranger');

var TemplateStore = require('../stores/template');
var actions = require('../actions');

var TemplateBrowser = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function () {
    return {
      templates: TemplateStore.availableTemplates()
    };
  },

  componentDidMount: function () {
    this.listenTo(TemplateStore, this._onChange);
  },

  handleExecute: function (item) {
    actions.openTemplate(item.path);
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <Ranger
        initialDir={Ranger.parseList(this.state.templates)}
        onExecute={this.handleExecute}
      />
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  }

});

module.exports = TemplateBrowser;
