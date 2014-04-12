
/*
 * Constants
 */

var sep = '\\s*:\\s*';
var hex = '(#[a-f0-9]{6})';

/*
 * Regexes
 */

var regex = {
  color: new RegExp('(foreground|background|color(\\d+))'+sep+hex, 'ig'),
  define: new RegExp('#define\\s*(\\w+)\\s*'+hex, 'ig')
};


module.exports = {


  /*
   * xresources.import
   *
   * - input (string) : text to parse
   * > colors (object)
   */

  import: function (input) {

    var output = {};
    var match;

    // replace #define
    input.replace(regex.define, function (_, key, value) {
      input = input.replace(key, value, 'ig');
    });

    console.log(input);


    // match colors

    while ((match = regex.color.exec(input)) !== null) {
      // if is colorN use N else use foreground/background
      var index = match[2] ? match[2] : match[1];
      var color = match[3];
      output[index] = color;
    }

    return output;

  },


  /*
   * xresources.export
   */

  export: function (input) {
  }

};
