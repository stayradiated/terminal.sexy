var $ = require('jquery');
var createReadStream = require('filereader-stream');
var Termio = require('termio');

var formats = {
  xresources: require('./formats/xresources'),
  css: require('./formats/css'),
  url: require('./formats/url'),
  defaults: require('./formats/defaults'),
  iterm: require('./formats/iterm')
};

var injectStyles = function (rule) {
  return $("<div />", {
    html: '&shy;<style>' + rule + '</style>', 
  }).appendTo("body");    
};

var loadTemplate = function (name) {
  $('.terminal').load('templates/' + name + '.html');
};

$(function () {

  var terminal = $('.terminal');

  // load template
  loadTemplate('columns');

  var oldStyles = null;

  $('.submit').on('click', function () {
    var text = $('textarea').val();
    var type = $('.importType').val();
    var colors;

    switch (type) {
      case 'xresources':
        colors = formats.xresources.import(text);
        break;
      case 'iterm':
        colors = formats.iterm.import(text);
        break;
      default:
        throw new Error('Import type not found: ' + type);
    }

    formats.defaults(colors);

    var css = formats.css.export(colors);

    if (oldStyles) oldStyles.remove();
    oldStyles = injectStyles(css);
  });

  $('.file-input').on('change', function (e) {
    var filelist = e.target.files;
    _.each(filelist, function (file) {
      var stream = createReadStream(file);
      var html = '';
      var output = stream.pipe(Termio());
      output.on('data', function (chunk) {
        html += chunk.toString();
      });
      output.on('end', function () {
        terminal.html(html);
      });
    });
  });

});
