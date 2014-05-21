var React = require('react');

var Header = React.createClass({

  open: function (name) {
    switch (name) {
      case 'editor':
        console.log('Opening editor');
        break;
    }
  },

  render: function () {
    return (
      <header className='header'>
        <h1>terminal.sexy</h1>
        <button onClick={this.open.bind(this, 'editor')}>Editor</button>
      </header>
    );
  }

});

module.exports = Header;
