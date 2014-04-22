var _ = require('underscore');
var assert = require('chai').assert;
var iterm = require('../../scripts/formats/iterm');
var fs = require('fs');
var tinycolor = require('../../scripts/vendor/tinycolor');

describe('formats/iterm', function () {

  var INPUT = fs.readFileSync(__dirname + '/files/iterm_input.txt').toString();
  var OUTPUT = require('./files/iterm_output.json');

  describe('.import', function () {

    it('should parse iterm config as XML', function (done) {

      iterm.import(INPUT).then(function (output) {
        for (var key in output) output[key] = output[key].toHexString();
        assert.deepEqual(output, OUTPUT);
        done();
      });

    });
  });

  describe('.export', function () {

    it('should export as XML', function () {
      var input = _.clone(OUTPUT);
      for (var key in input) {
        input[key] = tinycolor(input[key]);
      }
      var output = iterm.export(input);
      assert.equal(output, INPUT);
    });

  });

});
