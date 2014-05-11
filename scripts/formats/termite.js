var tinycolor = require('../vendor/tinycolor');

var regex = {
  color: /(foreground|background|color(\d\d?))\s*=\s*(#[a-f0-9]{6})/gi,
  comment: /^\s*#.*$/mg
};

module.exports = {

  import: function (input) {
    var output = {};
    var match;

    // remove comments
    input = input.replace(regex.comment, '');

    // match colors
    regex.color.lastIndex = 0;
    while ((match = regex.color.exec(input)) !== null) {
      // if is colorN use N else use foreground/background
      var index = match[2] ? match[2] : match[1];
      output[index] = tinycolor(match[3]);
    }

    return output;
  },

  export: function (input) {
    var output = '';
    var colors = [
      'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'
    ];

    output += '\n# special\n';
    output += 'background = ' + input.background.toHexString() + '\n';
    output += 'foreground = ' + input.foreground.toHexString() + '\n';

    for (var i = 0; i < 8; i++) {
      output += '\n# ' + colors[i] + '\n';
      output += 'color' + i + ' = ' + input[i].toHexString() + '\n';
      output += 'color' + (i + 8) + ' = ' + input[(i + 8)].toHexString() + '\n';
    }

    output += '\n';
    return output;

  }

};
