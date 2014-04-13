module.exports = {

  export : function (input) {
    var output = '';

    output += '.bg-bg { background: ' + input.background + '; }\n';
    output += '.fg-fg { color: ' + input.foreground + '; }\n';

    for (var i = 0; i < 16; i++) {
      output += '.bg-' + i + ' { background: ' + input[i] + '; }\n';
      output += '.fg-' + i + ' { color: ' + input[i] + '; }\n';
    }

    // TEMP
    // for (var i = 0; i < 8; i++) {
    //   output += '.bold .bg-' + i + ' { background: ' + input[i + 8] + '; }\n';
    //   output += '.bold .fg-' + i + ' { color: ' + input[i + 8] + '; }\n';
    // }

    return output;
  }

};
