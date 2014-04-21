
/*
 * Constants
 */

var hex = '(#[a-f0-9]{6})';

/*
 * Regexes
 */

var regex = {
  color: new RegExp('\\b(foreground|background|color([0-9][0-5]?))\\s*:\\s*'+hex, 'ig'),
  define: new RegExp('#define\\s*(\\w+)\\s*'+hex, 'ig'),
  comment: /^!.*$/mg
};

var DEFAULT_COLORS = '\n' +
  '#define black   #000000\n' +
  '#define red     #CC0403\n' +
  '#define green   #19CB00\n' +
  '#define yellow  #CECB00\n' +
  '#define blue    #001CD1\n' +
  '#define magenta #CB1ED1\n' +
  '#define cyan    #0DCDCD\n' +
  '#define white   #E5E5E5\n';

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

    // add default colors
    input += DEFAULT_COLORS;

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
      output[index] = tinycolor(color);
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

    output += '\n! special\n';
    output += '*background: ' + input.background.toHexString() + '\n';
    output += '*foreground: ' + input.foreground.toHexString() + '\n';

    for (var i = 0; i < 8; i++) {
      output += '\n! ' + colors[i] + '\n';
      output += '*color' + i + ': ' + input[i].toHexString() + '\n';
      output += '*color' + (i + 8) + ': ' + input[(i + 8)].toHexString() + '\n';
    }

    output += '\n';
    return output;
  }

};
