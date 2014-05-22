var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

  openWindow: function (id, options) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_WINDOW,
      id: id,
      options: options
    });
  },

  setAllColors: function (colors) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_ALL_COLORS,
      colors: colors
    });
  }

};

module.exports = AppActions;
