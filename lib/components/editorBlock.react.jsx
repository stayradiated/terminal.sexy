var React = require('react');
var Colr = require('colr');

var actions = require('../actions');

var EditorBlock = React.createClass({

  propTypes: {
    label: React.PropTypes.string.isRequired,
    color: React.PropTypes.instanceOf(Colr).isRequired
  },

  render: function () {
    var contrast = this.props.color.toGrayscale() < 128 ?  'dark' : 'light';

    return (
      /* jshint ignore: start */
      <div key={this.props.label} className={'block '+contrast}>
        <label className='foreground-8'>{this.props.label}</label>
        <div
          className={'color background-'+this.props.label}
          onClick={this.handleClick}
        >
          {this.props.color.toHex()}
        </div>
      </div>
      /* jshint ignore: end */
    );
  },

  handleClick: function () {
    actions.pickColor(this.props.color.toHex());
  }

});

module.exports = EditorBlock;
