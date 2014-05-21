var _ = require('lodash');

var AppDispatcher = _.extend(Dispatcher, {

  handleViewAction: function (action) {
    this.dispatch({
      source: 'VIEW_ACTION', // TODO: Put this in /constants?
      action: action
    });
  }

});

module.exports = AppDispatcher;
