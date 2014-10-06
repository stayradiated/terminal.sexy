'use strict';

var React = require('react');
var Ranger = require('react-ranger');

var TemplateStore = require('../stores/template');

var TemplateView = React.createClass({
  render: function () {
    var item = this.props.item;

    return (
      /* jshint ignore: start */
      <div>
        <p>{'Name: ' + item.name}</p>
        <p className='foreground-subtle'>{'Path: ' + item.path}</p>
      </div>
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
        showParent={false}
      />
      /* jshint ignore: end */
    );
  }

});

module.exports = TemplateBrowser;
