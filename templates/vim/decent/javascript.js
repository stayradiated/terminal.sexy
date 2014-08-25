var _ = require('underscore');
var TransformStream = require('stream').Transform;

var tokenStream = function () {
  var token = new Token();
  var stream = TransformStream({ objectMode: true });

  stream._transform = function (chunk, encoding, done) {
    var output = token.write(chunk);
    _.each(output, stream.push, stream);
    done();
  };

  return stream;
};

var Token = function (stream) {
  this.tokens = [
    // SGR escape codes
    [ /^\x1b\[(?:\d{0,3};?)+m/, this.replaceAnsi ],

    // All other escape codes
    [ /^\x1b\[[^@-~]*[@-~]/, this.replaceOtherAnsi ],

    // Replace ^[ chars
    [ /^\x1b/, this.replaceEscape ],

    // Keep actual text
    [ /^([^\x1b]+)/m, this.replaceText ]
  ];
};

_.extend(Token.prototype, {

  getNumbers: function (string) {
    return _.map(string.match(/\d+/g), function (number) {
      return parseInt(number, 10);
    });
  },

  replaceAnsi: function (codes) {
    codes = this.getNumbers(codes);
    if (! codes.length) codes = [0];
    return { type: 'ansi', value: codes };
  },

  replaceOtherAnsi: function (codes) {
    return { type: 'ansi-other', value: codes };
  },

  replaceText: function (text) {
    return { type: 'text', value: text };
  },

  replaceEscape: function () {
     return { type: 'text', value: 'ESC' };
  },

  process: function (fn, output) {
    var self = this;
    return function (match) {
      output.push(fn.call(self, match));
      return '';
    };
  },

  write: function (input) {
    var output = [];
    var len;

    // make sure it is not a buffer
    input = input.toString();

    while ((len = input.length) > 0) {

      forLoop:
      for (var i = 0; i < this.tokens.length; i++) {
        var token = this.tokens[i];
        if (token[0].test(input)) {
          input = input.replace(token[0], this.process(token[1], output));
          break forLoop;
        }
      }

      if (input.length === len) break;
    }

    return output;
  }
});

module.exports = tokenStream;
module.exports.Token = Token;
