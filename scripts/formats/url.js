var base64 = require('urlsafe-base64');

tinycolor.prototype.toRgbArray = function () {
  var rgb = this.toRgb();
  return [ rgb.r, rgb.g, rgb.b ];
};

module.exports = {

  /*
   * url.import
   */

  import: function (input) {
    var output = {};
    var buffer = base64.decode(input);

    for (var i = 0, len = buffer.length; i < len; i += 4) {
      var id = buffer[i];
      switch (id) {
        case 102: id = 'foreground'; break;
        case 98: id = 'background'; break;
      }
      if (id > 15) continue;
      var color = buffer.slice(i+1, i+4).toString('hex');
      output[id] = tinycolor(color);
    }

    return output;
  },


  /*
   * url.export
   *
   * Convert into a base64 string to save space
   *
   * - input (object)
   * > output (string)
   */

  export: function (input) {

    // format [<id>, <red>, <green>, <blue>, <id>, <red>, ...]
    // [0, 10, 10, 10, 1, 20, 20, 20, 2, 30, 30, 30, ...]
    // foreground id = 98
    // background id = 102

    var array = _.chain(input)
      .map(function (color, name) {
        var id = isNaN(parseInt(name)) ? name.charCodeAt(0) : parseInt(name);
        return [id, color.toRgbArray()];
      })
      .flatten()
      .value();

    var buffer = new Buffer(array);
    return base64.encode(buffer);
  }

};
