var React = require('react');
var Ranger = require('react-ranger');

var actions = require('../actions');
var SchemeStore = require('../stores/scheme');

var Schemes = React.createClass({

  handleExecute: function (file) {
    actions.setAllColors(file.contents.colors);
  },

  render: function () {
    var schemes = Ranger.parseFiles(SchemeStore.getSchemes(), {
      id: 'name'
    });

    return (
      /* jshint ignore: start */
      <Ranger
        initialDir={schemes}
        onExecute={this.handleExecute}
      />
      /* jshint ignore: end */
    );
  }

});

module.exports = Schemes;
