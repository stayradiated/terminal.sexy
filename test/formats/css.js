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
      '.alt-background-bg{background:#080808 !important;}\n'+
      '.background-bg{background:#000000 !important;}\n'+
      '.foreground-fg{color:#ffffff !important;}\n'+
      '.foreground-0{color:#000000 !important;}\n'+
      '.background-0{background:#000000 !important;}\n'+
      '.foreground-1{color:#111111 !important;}\n'+
      '.background-1{background:#111111 !important;}\n'+
      '.foreground-2{color:#222222 !important;}\n'+
      '.background-2{background:#222222 !important;}\n'+
      '.foreground-3{color:#333333 !important;}\n'+
      '.background-3{background:#333333 !important;}\n'+
      '.foreground-4{color:#444444 !important;}\n'+
      '.background-4{background:#444444 !important;}\n'+
      '.foreground-5{color:#555555 !important;}\n'+
      '.background-5{background:#555555 !important;}\n'+
      '.foreground-6{color:#666666 !important;}\n'+
      '.background-6{background:#666666 !important;}\n'+
      '.foreground-7{color:#777777 !important;}\n'+
      '.background-7{background:#777777 !important;}\n'+
      '.foreground-8{color:#888888 !important;}\n'+
      '.background-8{background:#888888 !important;}\n'+
      '.foreground-9{color:#999999 !important;}\n'+
      '.background-9{background:#999999 !important;}\n'+
      '.foreground-10{color:#aaaaaa !important;}\n'+
      '.background-10{background:#aaaaaa !important;}\n'+
      '.foreground-11{color:#bbbbbb !important;}\n'+
      '.background-11{background:#bbbbbb !important;}\n'+
      '.foreground-12{color:#cccccc !important;}\n'+
      '.background-12{background:#cccccc !important;}\n'+
      '.foreground-13{color:#dddddd !important;}\n'+
      '.background-13{background:#dddddd !important;}\n'+
      '.foreground-14{color:#eeeeee !important;}\n'+
      '.background-14{background:#eeeeee !important;}\n'+
      '.foreground-15{color:#ffffff !important;}\n'+
      '.background-15{background:#ffffff !important;}\n'
      );

    });

  });

});
