var React = require('react');
var Reflux = require('reflux');

var AppStore = require('../stores/app');
var CSS = require('../formats/css');

var StyleSheet = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function () {
    return {
      colors: AppStore.getState().colors
    };
  },

  componentDidMount: function () {
    this.listenTo(AppStore, this._onChange);
  },

  render: function () {
    var styles = CSS.export(this.state.colors);

    return (
      /* jshint ignore: start */
      <style dangerouslySetInnerHTML={{__html: styles}} />
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  }

});

module.exports = StyleSheet;
