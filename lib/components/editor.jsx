var _ = require('lodash');
var React = require('react');

var colorNames = [
  'bg', 'fg',
  0, 1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14, 15
];

var Editor = React.createClass({

  render: function () {
    var palette = _.map(colorNames, function (name) {
      return (
        <div key={name} className='block'>
          <label className='fg-8'>{name}</label>
          <div className={'color bg-'+name} />
        </div>
      );
    });

    return (
      <div className='editor'>
        <div className='palette'>
          {palette}
        </div>
      </div>
    );
  }

});

module.exports = Editor;
