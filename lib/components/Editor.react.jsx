var _ = require('lodash');
var React = require('react');
var AppStore = require('../stores/AppStore');

var colorNames = [
  'bg', 'fg',
  0, 8, 1, 9, 2, 10, 3, 11,
  4, 12, 5, 13, 6, 14, 7, 15
];

var getEditorState = function () {
  return {
    colors: AppStore.getColors()
  };
};

var Editor = React.createClass({

  getInitialState: function () {
    return getEditorState();
  },

  componentDidMount: function () {
    AppStore.on('change', this._onChange);
  },

  componentWillUnmount: function () {
    AppStore.off('change', this._onChange);
  },

  render: function () {
    var colors = AppStore.getColors();

    var palette = _.map(colorNames, function (name) {
      if (name === 'bg') id = 'background';
      else if (name == 'fg') id = 'foreground';
      else id = name;

      return (
        <div key={name} className='block'>
          <label className='foreground-8'>{name}</label>
          <div className={'color background-'+name}>
            {colors[id].toHexString()}
          </div>
        </div>
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
    this.setState(getEditorState());
  }

});

module.exports = Editor;
