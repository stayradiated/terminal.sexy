'use strict';

var React = require('react');
var Ranger = require('react-ranger');

var TemplateStore = require('../stores/template');

var TemplateView = React.createClass({
  render: function () {
    var item = this.props.item;

    return (
      /* jshint ignore: start */
      <span>{'Name: ' + item.name}</span>
      /* jshint ignore: end */
    );
  }
});

var TemplateBrowser = React.createClass({

  render: function () {
    return (
      /* jshint ignore: start */
      <Ranger
        store={TemplateStore.rangerStore()}
        view={TemplateView}
      />
      /* jshint ignore: end */
    );
  }

});

module.exports = TemplateBrowser;
