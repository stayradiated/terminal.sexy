require('../globals');

var url = require('../../scripts/formats/url');
var assert = require('chai').assert;

describe('formats/url', function () {

  describe('import', function () {

    it('should import from a string', function () {

      var input = 'AAgxOwGsQUICkKlZA9KERQRqn7UFqnWfBnW1qgeWmJYIE05fCcxmZgq1vWgL8MZ0DIGivg2ylLsOir63D8XIxmICGyFm6N_W';

      var output = url.import(input);

      for (var key in output) {
        if (! output.hasOwnProperty(key)) continue;
        output[key] = output[key].toHexString();
      }

      assert.deepEqual(output, {
        0:  '#08313b',
        1:  '#ac4142',
        2:  '#90a959',
        3:  '#d28445',
        4:  '#6a9fb5',
        5:  '#aa759f',
        6:  '#75b5aa',
        7:  '#969896',
        8:  '#134e5f',
        9:  '#cc6666',
        10: '#b5bd68',
        11: '#f0c674',
        12: '#81a2be',
        13: '#b294bb',
        14: '#8abeb7',
        15: '#c5c8c6',
        background: '#021b21',
        foreground: '#e8dfd6'
      });

    });

    it('should ignore colors greater than 16', function () {

      // [0, 0, 0, 0, 15, 15, 15, 15, 16, 16, 16, 16
      var input = 'AAAAAA8PDw8QEBAQ';

      var output = url.import(input);

      assert.deepEqual(_.keys(output), ['0', '15']);
    });

  });

  describe('.export', function () {

    it('should export as a url_base64 string', function () {

      var input = {
        foreground: '#000000',
        background: '#ffffff',
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

      var output = url.export(input);

      var expected = 'AAAAAAERERECIiIiAzMzMwREREQFVVVVBmZmZgd3d3cIiIiICZmZmQqqqqoLu7u7DMzMzA3d3d0O7u7uD____2YAAABi____';

      assert.equal(output, expected);

    });

  });

});
