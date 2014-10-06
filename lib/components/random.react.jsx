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
        <p>Randomly generate a color scheme.</p>
        <p>Based on the <a href='http://www.boronine.com/husl/syntax' target='_blank'>HUSL Random Syntax Highlighting Generator</a> by <a href='https://github.com/boronine' target='_blank'>Boronine</a>.</p>
        <p>Note: this will replace all the colors in your current scheme.</p>
        <button type='button' className='button' onClick={this.handleClick}>Generate</button>
      </div>
      /* jshint ignore: end */
    );
  },

});

module.exports = Random;
