var _ = require('lodash');
var Dispatcher = require('./Dispatcher');

var AppDispatcher = _.extend(Dispatcher, {

  handleViewAction: function (action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }

});

module.exports = AppDispatcher;
