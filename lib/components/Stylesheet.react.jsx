var React = require('react');
var CSS = require('../formats/css');

var StyleSheet = React.createClass({

  render: function () {
    var styles = CSS.export(this.props.colors);

    return (
      <style dangerouslySetInnerHTML={{__html: styles}} />
    );
  }

});

module.exports = StyleSheet;
