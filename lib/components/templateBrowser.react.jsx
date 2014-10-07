'use strict';

var _ = require('lodash');
var React = require('react');
var Ranger = require('react-ranger');

var actions = require('../actions');
var TemplateStore = require('../stores/template');

var TemplateView = React.createClass({
  render: function () {
    var item = this.props.item;

    return (
      /* jshint ignore: start */
      <div>
        <p>{'Name: ' + item.name}</p>
        <p className='foreground-subtle'>{'Path: ' + item.path}</p>
        <button type='button' className='button'
          onClick={_.partial(actions.openTemplate, item.path)}>
          Open Template
        </button>
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
        store={TemplateStore.rangerStore}
        view={TemplateView}
        showParent={false}
      />
      /* jshint ignore: end */
    );
  }

});

module.exports = TemplateBrowser;
