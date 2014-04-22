var assert = require('chai').assert;
var css = require('../../scripts/formats/css');
var tinycolor = require('../../scripts/vendor/tinycolor');

describe('formats/css', function () {

  describe('.export', function () {

    it('should export valid css', function () {

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

      var output = css.export(input);

      assert.equal(output,
      '.alt-background-bg{background:#080808;}\n'+
      '.background-bg{background:#000000;}\n'+
      '.foreground-fg{color:#ffffff;}\n'+
      '.foreground-0{color:#000000;}\n'+
      '.background-0{background:#000000;}\n'+
      '.foreground-1{color:#111111;}\n'+
      '.background-1{background:#111111;}\n'+
      '.foreground-2{color:#222222;}\n'+
      '.background-2{background:#222222;}\n'+
      '.foreground-3{color:#333333;}\n'+
      '.background-3{background:#333333;}\n'+
      '.foreground-4{color:#444444;}\n'+
      '.background-4{background:#444444;}\n'+
      '.foreground-5{color:#555555;}\n'+
      '.background-5{background:#555555;}\n'+
      '.foreground-6{color:#666666;}\n'+
      '.background-6{background:#666666;}\n'+
      '.foreground-7{color:#777777;}\n'+
      '.background-7{background:#777777;}\n'+
      '.bold .foreground-0, .foreground-8{color:#888888;}\n'+
      '.background-8{background:#888888;}\n'+
      '.bold .foreground-1, .foreground-9{color:#999999;}\n'+
      '.background-9{background:#999999;}\n'+
      '.bold .foreground-2, .foreground-10{color:#aaaaaa;}\n'+
      '.background-10{background:#aaaaaa;}\n'+
      '.bold .foreground-3, .foreground-11{color:#bbbbbb;}\n'+
      '.background-11{background:#bbbbbb;}\n'+
      '.bold .foreground-4, .foreground-12{color:#cccccc;}\n'+
      '.background-12{background:#cccccc;}\n'+
      '.bold .foreground-5, .foreground-13{color:#dddddd;}\n'+
      '.background-13{background:#dddddd;}\n'+
      '.bold .foreground-6, .foreground-14{color:#eeeeee;}\n'+
      '.background-14{background:#eeeeee;}\n'+
      '.bold .foreground-7, .foreground-15{color:#ffffff;}\n'+
      '.background-15{background:#ffffff;}\n'
      );

    });

  });

});
