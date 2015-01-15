'use strict';

var React = require('react');

var actions = require('../actions');

var Save = React.createClass({

  handleSave: function () {
    var path = this.refs.path.getDOMNode().value;
    var author = this.refs.author.getDOMNode().value;
    if (! path.length) { return; }
    actions.saveScheme(path, author);
  },

  render: function () {
    return (
      <div className='save'>
        <div className="control">
          <label>Path:</label>
          <input type='text' placeholder='/my-schemes/magical' ref='path' />
        </div>
        <div className="control">
          <label>Author:</label>
          <input type='text' placeholder='John Smith' ref='author' />
        </div>
        <div className='buttons'>
          <button type='button' onClick={this.handleSave} className='button button-export'>Save</button>
        </div>
      </div>
    );
  },

});

module.exports = Save;
