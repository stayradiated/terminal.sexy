var _ = require('underscore');
var url = require('../../scripts/formats/url');
var assert = require('chai').assert;
var tinycolor = require('../../scripts/vendor/tinycolor')

describe('formats/url', function () {

  var COLORS = {
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
  };

  var COLORS_URL = 'Ahsh6N_WCDE7rEFCkKlZ0oRFap-1qnWfdbWqlpiWE05fzGZmtb1o8MZ0gaK-spS7ir63xcjG';

  describe('.import', function () {

    it('should import from a string', function () {
      var output = url.import(COLORS_URL);

      // convert tinycolors to hex
      for (var key in output) {
        if (! output.hasOwnProperty(key)) continue;
        output[key] = output[key].toHexString();
      }

      assert.deepEqual(output, COLORS);
    });

  });

  describe('.export', function () {

    it('should export as a url_base64 string', function () {
      // convert COLORS to tinycolors
      var input = _.clone(COLORS);
      for (var key in input) input[key] = tinycolor(input[key]);

      var output = url.export(input);
      assert.equal(output, COLORS_URL);
    });

  });

});
