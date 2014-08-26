'use strict';

var React = require('react');
var Ranger = require('react-ranger');

var SchemeStore = require('../stores/scheme');

var Schemes = React.createClass({

  render: function () {
    return (
      /* jshint ignore: start */
      <Ranger store={SchemeStore.rangerStore()} />
      /* jshint ignore: end */
    );
  }

});

module.exports = Schemes;
