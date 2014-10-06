'use strict';

var React = require('react');
var Ranger = require('react-ranger');

var SchemeStore = require('../stores/scheme');

var ItemView = React.createClass({
  render: function () {
    var item = this.props.item.contents;

    if (item == null) {
      return null;
    }

    var colorSquares = [];
    var background = item.colors.background.toHex();

    for (var i = 0; i < 16; i += 1) {
      var color = item.colors[i];
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
