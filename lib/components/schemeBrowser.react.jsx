'use strict';

var _      = require('lodash');
var React  = require('react');
var Reflux = require('reflux');
var Ranger = require('react-ranger');

var actions     = require('../actions');
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
    var foreground = scheme.colors.foreground.toHex();

    var subtle = scheme.colors.background.clone();
    if (subtle.toGrayscale() < 128) {
      subtle.lighten(10);
    } else {
      subtle.darken(20);
    }
    subtle = subtle.toHex();

    for (var i = 0; i < 16; i += 1) {
      var id = Math.floor(i/2);
      if (i % 2 === 1) { id += 8; }

      var color = scheme.colors[id];
      colorSquares.push(
        /* jshint ignore: start */
        <div key={i} style={{
          background: color.toHex()
        }} />
        /* jshint ignore: end */
      );
    }

    return (
      /* jshint ignore: start */
      <div className='schemes' style={{ background: background }}>
        <h1 style={{ color: foreground }}>{scheme.name}</h1>
        <div style={{ color: foreground }}>By: {scheme.author}</div>
        <button type='button' className='button'
          onClick={_.partial(actions.openScheme, path)}
          style={{ background: subtle, color: foreground, borderColor: subtle }}
        >Apply Scheme</button>
        <div className='colors' >
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
