module.exports = {

  export : function (input) {
    var output = '';

    output += '.background-bg { background-color: ' + input.background + '; }\n';
    output += '.foreground-fg { color: ' + input.foreground + '; }\n';

    for (var i = 0; i < 16; i++) {
      if (i >= 8) output += '.bold .foreground-' + (i - 8) + ', ';
      output += '.foreground-' + i + ' { color: ' + input[i] + '; }\n';
      output += '.background-' + i + ' { background-color: ' + input[i] + '; }\n';
    }

    return output;
  }

};
