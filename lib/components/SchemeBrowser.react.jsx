var _ = require('lodash');
var React = require('react');
var AppActions = require('../actions/AppActions');
var SchemeStore = require('../stores/SchemeStore');
var Ranger = require('react-ranger');

var Schemes = React.createClass({

  handleExecute: function (file) {
    console.log(file);
    AppActions.setAllColors(file.contents.colors);
  },

  render: function () {

    var schemes = Ranger.parseFiles(SchemeStore.getSchemes(), {
      id: 'name'
    });

    return (
      <Ranger
        data={schemes}
        onExecute={this.handleExecute}
      />
    );
  }

});

module.exports = Schemes;
