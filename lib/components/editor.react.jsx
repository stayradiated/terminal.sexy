'use strict';

var React = require('react');
var Reflux = require('reflux');

var AppStore = require('../stores/app');
var EditorBlock = require('./editorBlock.react');

var colorNames = [
  'bg', 'fg',
  0, 8, 1, 9, 2, 10, 3, 11,
  4, 12, 5, 13, 6, 14, 7, 15
];

var Editor = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentDidMount: function () {
    this.listenTo(AppStore, this._onChange);
  },

  render: function () {
    var colors = AppStore.getState().colors;

    var palette = colorNames.map(function (name) {
      var id = name;

      if (name === 'bg') {
        id = 'background';
      } else if (name === 'fg') {
        id = 'foreground';
      } 

      return (
        <EditorBlock
          key={id}
          label={name.toString()}
          color={colors[id]}
        />
      );
    }, this);

    return (
      <div className='editor'>
        <div className='palette'>
          {palette}
        </div>
      </div>
    );
  },

  _onChange: function () {
    this.forceUpdate();
  }

});

module.exports = Editor;
