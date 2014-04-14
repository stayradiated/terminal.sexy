module.exports = {

  export : function (input) {
    var output = '';

    output += '.bg-bg { background: ' + input.background + '; }\n';
    output += '.fg-fg { color: ' + input.foreground + '; }\n';

    for (var i = 0; i < 16; i++) {
      if (i >= 8) output += '.bold .fg-' + (i - 8) + ', ';
      output += '.fg-' + i + ' { color: ' + input[i] + '; }\n';
      output += '.bg-' + i + ' { background: ' + input[i] + '; }\n';
    }

    return output;
  }

};
