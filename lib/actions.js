'use strict';

var Reflux = require('reflux');

var actions = Reflux.createActions([

  'openWindow',
  'resetLayout',

  'pickColor',
  'openTemplate',

  'setColor',
  'setAllColors',
  'generateRandomColors',

  'setFont',

]);

module.exports = actions;
