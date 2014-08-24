'use strict';

var Reflux = require('reflux');

var actions = Reflux.createActions([

  'openWindow',

  'pickColor',
  'openTemplate',

  'setColor',
  'setAllColors',
  'generateRandomColors'

]);

module.exports = actions;
