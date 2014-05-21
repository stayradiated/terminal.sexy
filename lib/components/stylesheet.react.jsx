var React = require('react');

var StyleSheet = React.createClass({

  getInitialState: function () {
    return {
      styles: 'body{background:red;}'
    };
  },

  render: function () {
    return (
      <style dangerouslySetInnerHTML={{__html: this.state.styles}} />
    );
  }

});

module.exports = StyleSheet;
