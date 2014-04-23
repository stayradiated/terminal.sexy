var _ = require('underscore');
var tinycolor = require('../vendor/tinycolor');

var lookup = {
  'Background Color': 'background',
  'Foreground Color': 'foreground',
  'Cursor Color': 'foreground',
  'Cursor Text Color': 'background',
  'Ansi 0 Color': '0',
  'Ansi 8 Color': '8',
  'Ansi 1 Color': '1',
  'Ansi 9 Color': '9',
  'Ansi 2 Color': '2',
  'Ansi 10 Color': '10',
  'Ansi 3 Color': '3',
  'Ansi 11 Color': '11',
  'Ansi 4 Color': '4',
  'Ansi 12 Color': '12',
  'Ansi 5 Color': '5',
  'Ansi 13 Color': '13',
  'Ansi 6 Color': '6',
  'Ansi 14 Color': '14',
  'Ansi 7 Color': '7',
  'Ansi 15 Color': '15'
};

var regex = {
  group: /<key>([^<]*)<\/key>\s*<dict>/gi,
  component: /<key>(Blue|Green|Red) Component<\/key>/gi,
  real: /<real>([\d.]+)<\/real>/gi
};

module.exports = {

  import: function (input) {
    regex.group.lastIndex = 0;
    var output = {};

    var group;
    while ((group = regex.group.exec(input)) !== null) {
      var groupName = group[1];
      var colorName = lookup[groupName];
      if (! colorName) continue;

      regex.component.lastIndex = group.index;
      var color = {};
      for (var i = 0; i < 3; i++) {
        var component = regex.component.exec(input);
        if (! component) continue;

        var componentName = component[1].toLowerCase();
        regex.real.lastIndex = component.index;
        color[componentName] = regex.real.exec(input)[1] * 255;
      }
      output[colorName] = tinycolor({
        r: color.red, g: color.green, b: color.blue
      });
    }

    return output;
  },

  export: function (input) {

    var before = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
      '<plist version="1.0">',
      '<dict>\n'
    ].join('\n');

    var section = [
      '  <key>{{ NAME }}</key>',
      '  <dict>',
      '    <key>Blue Component</key>',
      '    <real>{{ BLUE }}</real>',
      '    <key>Color Space</key>',
      '    <string>sRGB</string>',
      '    <key>Green Component</key>',
      '    <real>{{ GREEN }}</real>',
      '    <key>Red Component</key>',
      '    <real>{{ RED }}</real>',
      '  </dict>\n'
    ].join('\n');

    var after = [
      '</dict>',
      '</plist>\n'
    ].join('\n');

    return _.reduce(lookup, function (output, id, name) {
      color = input[id].toRgb();
      return output += section
        .replace('{{ NAME }}', name)
        .replace('{{ RED }}', color.r / 255)
        .replace('{{ GREEN }}', color.g / 255)
        .replace('{{ BLUE }}', color.b / 255);
    }, before) + after;
  }

};
