var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

  openWindow: function (id, options) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_WINDOW,
      id: id,
      options: options
    });
  },

  setAllColors: function (colors) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_ALL_COLORS,
      colors: colors
    });
  }

};

module.exports = AppActions;
