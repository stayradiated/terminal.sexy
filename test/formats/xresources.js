var assert = require('chai').assert;
var xresources = require('../../scripts/formats/xresources');
var tinycolor = require('../../scripts/vendor/tinycolor');

describe('formats/xresources', function () {

  describe('.import', function () {

    var testImport = function (input, expected) {
      var output = xresources.import(input);

      for (var key in output) {
        if (! output.hasOwnProperty(key)) continue;
        output[key] = output[key].toHexString();
      }

      assert.deepEqual(output, expected);
    };

    it('should parse colors 0 - 15', function () {

      var input =
        'color0:  #012345 \n'+
        'color1:  #123456 \n'+
        'color2:  #234567 \n'+
        'color3:  #345678 \n'+
        'color4:  #456789 \n'+
        'color5:  #56789a \n'+
        'color6:  #6789ab \n'+
        'color7:  #789abc \n'+
        'color8:  #89abcd \n'+
        'color9:  #9abcde \n'+
        'color10: #abcdef \n'+
        'color11: #bcdef0 \n'+
        'color12: #cdef01 \n'+
        'color13: #def012 \n'+
        'color14: #ef0123 \n'+
        'color15: #f01234 \n';

      var expected = {
        0:  '#012345',
        1:  '#123456',
        2:  '#234567',
        3:  '#345678',
        4:  '#456789',
        5:  '#56789a',
        6:  '#6789ab',
        7:  '#789abc',
        8:  '#89abcd',
        9:  '#9abcde',
        10: '#abcdef',
        11: '#bcdef0',
        12: '#cdef01',
        13: '#def012',
        14: '#ef0123',
        15: '#f01234'
      };

      testImport(input, expected);

    });

    it('should parse foreground and background colors', function () {

      var input =
        'background: #bada55 \n'+
        'foreground: #c0ffee \n';

      var expected = {
        background: '#bada55',
        foreground: '#c0ffee'
      };

      testImport(input, expected);

    });

    it('should parse different prefixes', function () {

      var input =
        'color0:        #012345 \n'+
        '.color1:       #123456 \n'+
        '*color2:       #234567 \n'+
        'urxvt.color3:  #345678 \n'+
        'urxvt*color4:  #456789 \n'+
        'URxvt.color5:  #56789a \n'+
        'URxvt*color6:  #6789ab \n';

      var expected = {
        0:  '#012345',
        1:  '#123456',
        2:  '#234567',
        3:  '#345678',
        4:  '#456789',
        5:  '#56789a',
        6:  '#6789ab',
      };

      testImport(input, expected);

    });

    it('should replace definitions', function () {

      var input =
        '#define red #ff0000 \n'+
        '#define green #00ff00 \n'+
        '#define yellow #00ffff \n'+
        'color1: red \n' +
        'color2: green \n' +
        'color3: yellow \n' +
        'color4: missing \n' +
        'color9: red \n';

      var expected = {
        1: '#ff0000',
        2: '#00ff00',
        3: '#00ffff',
        9: '#ff0000'
      };

      testImport(input, expected);

    });

    it('should ignore comments', function () {

      var input =
        'color1: #ff0000 \n'+
        '! color1: #000000 \n';

      var expected = {
        1: '#ff0000'
      };

      testImport(input, expected);

    });

    it('should only ignore partial words', function () {

      var input =
        'color2: #ff0000 \n'+
        'cursorColor2: #000000 \n'; 

      var expected = {
        2: '#ff0000'
      };

      testImport(input, expected);

    });

    it('should handle default color names', function () {

      var input =
        'color0: black \n'+
        'color1: red \n'+
        'color2: green \n'+
        'color3: yellow \n'+
        'color4: blue \n'+
        'color5: magenta \n'+
        'color6: cyan \n'+
        'color7: white \n';

      var expected = {
        0: '#000000',
        1: '#cc0403',
        2: '#19cb00',
        3: '#cecb00',
        4: '#001cd1',
        5: '#cb1ed1',
        6: '#0dcdcd',
        7: '#e5e5e5'
      };

      testImport(input, expected);

    });

  });

  describe('.export', function () {

    it('should export as a valid Xresources file', function () {

      var input = {
        background: '#000000',
        foreground: '#ffffff',
        0:  '#000000',
        1:  '#111111',
        2:  '#222222',
        3:  '#333333',
        4:  '#444444',
        5:  '#555555',
        6:  '#666666',
        7:  '#777777',
        8:  '#888888',
        9:  '#999999',
        10: '#aaaaaa',
        11: '#bbbbbb',
        12: '#cccccc',
        13: '#dddddd',
        14: '#eeeeee',
        15: '#ffffff'
      };

      for (var key in input) {
        input[key] = tinycolor(input[key]);
      }

      var output = xresources.export(input);

      assert.equal(output,
        '\n'+
        '! special\n'+
        '*background: #000000\n'+
        '*foreground: #ffffff\n'+
        '\n'+
        '! black\n'+
        '*color0: #000000\n'+
        '*color8: #888888\n'+
        '\n'+
        '! red\n'+
        '*color1: #111111\n'+
        '*color9: #999999\n'+
        '\n'+
        '! green\n'+
        '*color2: #222222\n'+
        '*color10: #aaaaaa\n'+
        '\n'+
        '! yellow\n'+
        '*color3: #333333\n'+
        '*color11: #bbbbbb\n'+
        '\n'+
        '! blue\n'+
        '*color4: #444444\n'+
        '*color12: #cccccc\n'+
        '\n'+
        '! magenta\n'+
        '*color5: #555555\n'+
        '*color13: #dddddd\n'+
        '\n'+
        '! cyan\n'+
        '*color6: #666666\n'+
        '*color14: #eeeeee\n'+
        '\n'+
        '! white\n'+
        '*color7: #777777\n'+
        '*color15: #ffffff\n\n'
      );

    });

  });

});
