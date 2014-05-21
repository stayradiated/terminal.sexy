var _ = require('lodash');
module.exports = _.forIn({

  OPEN_WINDOW: null,

}, function (value, key, obj) { obj[key] = key; });
