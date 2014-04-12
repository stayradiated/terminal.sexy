
/*
 * Constants
 */

var sep = '\\s*:\\s*';
var hex = '(#[a-f0-9]{6})';

/*
 * Regexes
 */

var regex = {
  color: new RegExp('\\b(foreground|background|color(\\d+))'+sep+hex, 'ig'),
  define: new RegExp('#define\\s*(\\w+)\\s*'+hex, 'ig'),
  comment: /^!.*$/mg
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

    // remove comments
    input = input.replace(regex.comment, '');

    // replace #define
    input.replace(regex.define, function (_, key, value) {
      var regex = new RegExp(key, 'ig');
      input = input.replace(regex, value);
    });


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
   * 
   * - input (object)
   * > output (string)
   */

  export: function (input) {
    var output = '';
    var colors = [
      'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'
    ];

    output += '\n! --- special colors ---\n\n';
    output += '*background: ' + input.background + '\n';
    output += '*foreground: ' + input.foreground + '\n';
    output += '\n! --- standard colors ---\n';

    for (var i = 0; i < 8; i++) {
      output += '\n! ' + colors[i] + '\n';
      output += '*color' + i + ': ' + input[i] + '\n';
      output += '\n! bright_' + colors[i] + '\n';
      output += '*color' + (i + 8) + ': ' + input[(i + 8)] + '\n';
    }

    output += '\n';
    return output;
  }

};
