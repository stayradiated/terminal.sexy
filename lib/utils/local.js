'use strict';

var _ = require('lodash');

/*
 * Minimal LocalStorage wrapper
 */

var save = function (name, content) {
  localStorage[name] = JSON.stringify(content);
};

var LocalStore = {

  save: _.debounce(save, 500),

  load: function (name) {
    var data;
    try {
      data = JSON.parse(localStorage[name]);
    } catch (e) {
      data = undefined;
    }
    return data;
  },

  clear: function (name) {
    delete localStorage[name];
  },

};

module.exports = LocalStore;
