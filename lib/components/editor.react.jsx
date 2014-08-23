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

  getInitialState: function () {
    return {
      colors: AppStore.getState().colors
    };
  },

  componentDidMount: function () {
    this.listenTo(AppStore, this._onChange);
  },

  render: function () {
    var palette = colorNames.map(function (name) {
      if (name === 'bg') id = 'background';
      else if (name == 'fg') id = 'foreground';
      else id = name;

      return new EditorBlock({
        key: id,
        label: name.toString(),
        color: this.state.colors[id]
      });
    }, this);

    return (
      /* jshint ignore: start */
      <div className='editor'>
        <div className='palette'>
          {palette}
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  }

});

module.exports = Editor;
