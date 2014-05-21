var Promise = require('bluebird');
var _ = require('lodash');

var _callbacks = [];
var _promises = [];

var _addPromise = function (callback, payload) {
  _promises.push(new Promise(function (resolve, reject) {
    if (callback(payload)) {
      resolve(payload);
    } else {
      reject(new Error('Dispatcher callback unsuccessful'));
    }
  }));
};

var _clearPromises = function () {
  _promises = [];
};

var Dispatcher = {

  /**
   * Register
   * - callback (function) : the callback to be registered
   * > number : the index of the callback
   */

  register: function (callback) {
    return _callbacks.push(callback) - 1;
  },


  /**
   * Dispatch
   * - payload (object) : the data from the action
   */

  dispatch: function (payload) {
    _callbacks.forEach(function (callback) {
      _addPromise(callback, payload);
    });
    Promise.all(_promises).then(_clearPromises);
  }

};

module.exports = Dispatcher;
