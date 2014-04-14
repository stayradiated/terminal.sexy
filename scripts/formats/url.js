var base64 = require('urlsafe-base64');


tinycolor.prototype.toRgbArray = function () {
  var rgb = this.toRgb();
  return [ rgb.r, rgb.g, rgb.b ];
};


var ORDER = [
  'background', 'foreground',
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
];


module.exports = {

  /*
   * url.import
   *
   * Convert a 76 byte string into a collection of colors
   *
   * - input (string)
   * > output (object)
   */

  import: function (input) {
    var output = {};
    var buffer = base64.decode(input);

    for (var i = 0, len = ORDER.length; i < len; i++) {
      var id = ORDER[i];
      var color = buffer.slice(i * 3, i * 3 + 3).toString('hex');
      output[id] = tinycolor(color);
    }

    return output;
  },


  /*
   * url.export
   *
   * Convert into a 76 byte url-base64 string to save space
   *
   * - input (object)
   * > output (string)
   */

  export: function (input) {
    var array = _.chain(ORDER).map(function (name) {
      return input[name].toRgbArray();
    }).flatten().value();

    var buffer = new Buffer(array);
    return base64.encode(buffer);
  }

};
