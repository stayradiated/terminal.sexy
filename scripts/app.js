var formats = {
  xresources: require('./formats/xresources'),
  css: require('./formats/css')
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
    var css = formats.css.export(formats.xresources.import(text));

    if (oldStyles) oldStyles.remove();
    oldStyles = injectStyles(css);

  });

});
