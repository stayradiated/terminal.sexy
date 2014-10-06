'use strict';

var React = require('react');
var version = require('../../package.json').version;

var About = React.createClass({

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='about'>
        <h4>terminal.sexy {version}</h4>
        <p>Developed by <a target='_blank' href='https://github.com/stayradiated'>George Czabania</a> in New Zealand since April 2014.</p>
        <p>Open source under the <a href='https://github.com/stayradiated/terminal.sexy/blob/master/LICENSE' target='_blank'>MIT license</a> - <a href='https://github.com/stayradiated/terminal.sexy' target='_blank'>https://github.com/stayradiated/terminal.sexy</a></p>
        <p>Inspired by <a target='_blank' href='http://ciembor.github.io/4bit'>4bit</a></p>
        <p>Libraries used include:</p>
        <ul>
          <li><a target='_blank' href='https://github.com/stayradiated/colr'>colr</a> - convert between color formats (rgb, hsl, etc.)</li>
          <li><a target='_blank' href='https://github.com/stayradiated/termio'>termio</a> - convert ansi escape codes into html</li>
          <li><a target='_blank' href='https://github.com/stayradiated/termcolors'>termcolors</a> - import and export between multiple terminal color scheme formats</li>
          <li><a target='_blank' href='https://github.com/stayradiated/react-ranger'>react-ranger</a> - column browser (used for the scheme and template file browser)</li>
          <li><a target='_blank' href='https://github.com/stayradiated/react-colorpicker'>react-colorpicker</a> - simple colorpicker for react</li>
        </ul>
        <p>Also uses an unmodified copy of <a href='https://golden-layout.com' target='_blank'>Golden Layout</a> by Hoxton One Ltd under the <a href='http://creativecommons.org/licenses/by-nc/4.0/' target='_blank'>Attribution-NonCommercial 4.0 International license.</a></p>
      </div>
      /* jshint ignore: end */
    );
  },

});

module.exports = About;
