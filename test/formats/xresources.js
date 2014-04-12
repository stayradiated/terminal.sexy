var mocha = require('mocha');
var assert = require('chai').assert;
var xresources = require('../../scripts/formats/xresources');

describe('formats/xresources', function () {

  describe('.import', function () {

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

      var output = xresources.import(input);

      assert.deepEqual(output, {
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
      });

    });

    it('should parse foreground and background colors', function () {

      var input =
        'background: #bada55 \n'+
        'foreground: #c0ffee \n';

      var output = xresources.import(input);

      assert.deepEqual(output, {
        background: '#bada55',
        foreground: '#c0ffee'
      });

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

      var output = xresources.import(input);

      assert.deepEqual(output, {
        0:  '#012345',
        1:  '#123456',
        2:  '#234567',
        3:  '#345678',
        4:  '#456789',
        5:  '#56789a',
        6:  '#6789ab',
      });

    });

    it('should replace definitions', function () {

      var input =
        '#define red #ff0000 \n'+
        'color1: red \n';

      var output = xresources.import(input);

      assert.deepEqual(output, {
        1: '#ff0000'
      });

    });

  });

});
