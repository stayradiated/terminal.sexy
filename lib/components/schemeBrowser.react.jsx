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
  },

  render: function () {
    var path = this.props.item.path;
    var scheme = SchemeStore.get(path);

    if (scheme == null) {
      // if we haven't already cached the scheme
      // then fetch it from the server and wait
      SchemeStore.load(path);
      return null;
    }

    var colorSquares = [];
    var background = scheme.colors.background.toHex();

    for (var i = 0; i < 16; i += 1) {
      var id = Math.floor(i/2);
      if (i % 2 === 1) { id += 8; }

      var color = scheme.colors[id];
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
        <h1>{scheme.name}</h1>
        <div>By: {scheme.author}</div>
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
        store={SchemeStore.rangerStore}
        view={ItemView}
        showParent={false}
      />
      /* jshint ignore: end */
    );
  }

});

module.exports = Schemes;
