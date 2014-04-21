var defaultColors = {
  0: '#000000',
  1: '#cc0403',
  2: '#19cb00',
  3: '#cecb00',
  4: '#001cd1',
  5: '#cb1ed1',
  6: '#0dcdcd',
  7: '#e5e5e5',
  8: '#4d4d4d',
  9: '#3e0605',
  10: '#23fd00',
  11: '#fffd00',
  12: '#0026ff',
  13: '#fd28ff',
  14: '#14ffff',
  15: '#ffffff',
  background: '#000000',
  foreground: '#ffffff'
};

for (var key in defaultColors) {
  if (! defaultColors.hasOwnProperty(key)) continue;
  defaultColors[key] = tinycolor(defaultColors[key]);
}

var defaults = function (colors) {
  return _.defaults(colors, defaultColors);
};

module.exports = defaults;
