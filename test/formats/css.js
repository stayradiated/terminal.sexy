var assert = require('chai').assert;
var css = require('../../scripts/formats/css');

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

      var output = css.export(input);

      assert.equal(output,
      '.bg-bg { background: #000000; }\n'+
      '.fg-fg { color: #ffffff; }\n'+
      '.bg-0 { background: #000000; }\n'+
      '.fg-0 { color: #000000; }\n'+
      '.bg-1 { background: #111111; }\n'+
      '.fg-1 { color: #111111; }\n'+
      '.bg-2 { background: #222222; }\n'+
      '.fg-2 { color: #222222; }\n'+
      '.bg-3 { background: #333333; }\n'+
      '.fg-3 { color: #333333; }\n'+
      '.bg-4 { background: #444444; }\n'+
      '.fg-4 { color: #444444; }\n'+
      '.bg-5 { background: #555555; }\n'+
      '.fg-5 { color: #555555; }\n'+
      '.bg-6 { background: #666666; }\n'+
      '.fg-6 { color: #666666; }\n'+
      '.bg-7 { background: #777777; }\n'+
      '.fg-7 { color: #777777; }\n'+
      '.bg-8 { background: #888888; }\n'+
      '.fg-8 { color: #888888; }\n'+
      '.bg-9 { background: #999999; }\n'+
      '.fg-9 { color: #999999; }\n'+
      '.bg-10 { background: #aaaaaa; }\n'+
      '.fg-10 { color: #aaaaaa; }\n'+
      '.bg-11 { background: #bbbbbb; }\n'+
      '.fg-11 { color: #bbbbbb; }\n'+
      '.bg-12 { background: #cccccc; }\n'+
      '.fg-12 { color: #cccccc; }\n'+
      '.bg-13 { background: #dddddd; }\n'+
      '.fg-13 { color: #dddddd; }\n'+
      '.bg-14 { background: #eeeeee; }\n'+
      '.fg-14 { color: #eeeeee; }\n'+
      '.bg-15 { background: #ffffff; }\n'+
      '.fg-15 { color: #ffffff; }\n'
      );

    });

  });

});
