var React = require('react');
var Reflux = require('reflux');

var AppStore = require('../stores/app');

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

      return (
        /* jshint ignore: start */
        <div key={name} className='block'>
          <label className='foreground-8'>{name}</label>
          <div className={'color background-'+name}>
            {this.state.colors[id].toHex()}
          </div>
        </div>
        /* jshint ignore: end */
      );
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
