var React = require('react');
var SchemeStore = require('../stores/SchemeStore');
var SchemeItem = require('./SchemeItem.react');

var Schemes = React.createClass({

  render: function () {

    var schemes = SchemeStore.getSchemes().map(function (scheme) {
      return <SchemeItem key={scheme.name} scheme={scheme} />;
    });

    return (
      <ul className='schemes background-bg foreground-fg'>
        {schemes}
      </ul>
    );
  }

});

module.exports = Schemes;
