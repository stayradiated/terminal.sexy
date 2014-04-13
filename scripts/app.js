var formats = {
  xresources: require('./formats/xresources'),
  css: require('./formats/css'),
  url: require('./formats/url')
};

var injectStyles = function (rule) {
  return $("<div />", {
    html: '&shy;<style>' + rule + '</style>'
  }).appendTo("body");    
};

$(function () {

  var oldStyles = null;

  $('.submit').on('click', function () {
    var text = $('textarea').val();
    var colors = formats.xresources.import(text);
    var css = formats.css.export(colors);

    if (oldStyles) oldStyles.remove();
    oldStyles = injectStyles(css);

    console.log(formats.url.export(colors));

  });

});
