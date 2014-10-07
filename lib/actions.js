'use strict';

var Reflux = require('reflux');

var actions = Reflux.createActions([

  'openWindow',
  'resetLayout',

  'pickColor',
  'openTemplate',
  'importTemplate',

  'setColor',
  'setAllColors',
  'generateRandomColors',

  'saveScheme',

  'setFont',
  'setPicker',

]);

module.exports = actions;
