'use strict';

var React = require('react');
var Ranger = require('react-ranger');

var TemplateStore = require('../stores/template');

var TemplateBrowser = React.createClass({

  render: function () {
    return (
      /* jshint ignore: start */
      <Ranger store={TemplateStore.rangerStore()} />
      /* jshint ignore: end */
    );
  }

});

module.exports = TemplateBrowser;
