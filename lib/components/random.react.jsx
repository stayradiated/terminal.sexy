'use strict';

var React = require('react');

var Random = require('../stores/random');
var actions = require('../actions');

var Random = React.createClass({

  handleClick: function () {
    actions.generateRandomColors();
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='random'>
        <div className='button' onClick={this.handleClick}>
          Generate
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

});

module.exports = Random;
