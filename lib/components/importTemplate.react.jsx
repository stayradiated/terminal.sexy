'use strict';

var _ = require('lodash');
var React = require('react');
var createReadStream = require('filereader-stream');

var actions = require('../actions');

var ImportTemplate = React.createClass({

  handleSubmit: function () {
    var filename = this.refs.name.getDOMNode().value;
    var filelist = this.refs.file.getDOMNode().files;

    if (! (filename.length && filelist.length)) {
      alert('Must enter name and select a file');
      return;
    }

    var file = filelist[0];
    var stream = createReadStream(file);

    actions.importTemplate(filename, stream);
  },

  render: function () {
    return (
      /* jshint ignore: start */
      <div className='import-template'>
        <div className='control'>
          <label className='foreground-subtle'>Template Name:</label>
          <input type='text' ref='name' placeholder='/user/vim/js' />
        </div>
        <div className='control'>
          <label className='foreground-subtle'>Tmux Output:</label>
          <input type='file' ref='file' />
        </div>
        <div className='buttons'>
          <div onClick={this.handleSubmit} className='button button-import'>Import</div>
        </div>
      </div>
      /* jshint ignore: end */
    );
  }

});

module.exports = ImportTemplate;
