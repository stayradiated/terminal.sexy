'use strict';

var React = require('react');
var Reflux = require('reflux');
var Ranger = require('react-ranger');

var actions = require('../actions');
var SchemeStore = require('../stores/scheme');

var ItemView = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentDidMount: function () {
    this.listenTo(SchemeStore, this._onChange);
    actions.loadScheme(this.props.item);
  },

  componentWillReceiveProps: function (nextprops) {
    actions.loadScheme(nextprops.item);
  },

  render: function () {
    var item = this.props.item.contents;

    if (item == null) {
      return null;
    }

    var colorSquares = [];
    var background = item.colors.background.toHex();

    for (var i = 0; i < 16; i += 1) {
      var id = Math.floor(i/2);
      if (i % 2 === 1) { id += 8; }

      var color = item.colors[id];
      colorSquares.push(
        /* jshint ignore: start */
        <div key={i} style={{
          background: color.toHex(),
          borderColor: background
        }} />
        /* jshint ignore: end */
      );
    }

    return (
      /* jshint ignore: start */
      <div className='schemes'>
        <h1>{item.name}</h1>
        <div>By: {item.author}</div>
        <div className='colors' style={{ background: background }}>
          {colorSquares}
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

var Schemes = React.createClass({

  render: function () {
    return (
      /* jshint ignore: start */
      <Ranger
        store={SchemeStore.rangerStore()}
        view={ItemView}
        showParent={false}
      />
      /* jshint ignore: end */
    );
  }

});

module.exports = Schemes;
