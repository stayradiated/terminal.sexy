var AppConstants = require('../constants/AppConstants');

var AppActions = {

  openWindow: function (id) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_WINDOW,
      id: id
    });
  }

};

module.exports = AppActions;
