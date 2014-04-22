var tinycolor = require('../vendor/tinycolor');

if (typeof(window) !== 'undefined' && window.document) {
  require('domo')(document);
} else {
  require('domo').global();
}

module.exports = {

  export : function (input) {

    var output = '';

    output += STYLE.on('.alt-background-bg', {
      background: tinycolor.lighten(input.background, 3).toHexString()
    });

    output += STYLE.on('.background-bg', {
      background: input.background.toHexString()
    });

    output += STYLE.on('.foreground-fg', {
      color: input.foreground.toHexString()
    });

    for (var i = 0; i < 16; i++) {
      if (i >= 8) output += '.bold .foreground-' + (i - 8) + ', ';
      output += STYLE.on('.foreground-' + i, { color: input[i].toHexString() });
      output += STYLE.on('.background-' + i, { background: input[i].toHexString() });
    }

    return output;
  }

};
