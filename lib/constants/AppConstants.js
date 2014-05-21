var _ = require('lodash');
module.exports = _.forIn({

  OPEN_WINDOW: null,
  SET_ALL_COLORS: null

}, function (value, key, obj) { obj[key] = key; });
