var React = require('react');
var CSS = require('../formats/css');

var StyleSheet = React.createClass({

  render: function () {
    var styles = CSS.export(this.props.colors);

    return (
      /* jshint ignore: start */
      <style dangerouslySetInnerHTML={{__html: styles}} />
      /* jshint ignore: end */
    );
  }

});

module.exports = StyleSheet;
