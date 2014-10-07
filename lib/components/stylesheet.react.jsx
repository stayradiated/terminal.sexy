'use strict';

var _ = require('lodash');
var Colr = require('colr');
var React = require('react/addons');
var Reflux = require('reflux');

var AppStore = require('../stores/app');
var CSS = require('../formats/css');

var CSSMixin = {
  render: function () {
    var styles = CSS.export(this.props.id, this.props.data);

    return (
      /* jshint ignore: start */
      <style dangerouslySetInnerHTML={{__html: styles}} />
      /* jshint ignore: end */
    );
  },
};

var ColorStyle = React.createClass({

  mixins: [CSSMixin],

  propTypes: {
    id: React.PropTypes.string.isRequired,
    data: React.PropTypes.instanceOf(Colr).isRequired,
  },

  shouldComponentUpdate: function (nextProps) {
    return nextProps.data.toHex() !== this.props.data.toHex();
  },

});

var FontStyle = React.createClass({

  mixins: [CSSMixin],

  propTypes: {
    id: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
  },

  shouldComponentUpdate: function (nextProps) {
    return ! _.isEqual(nextProps.data, this.props.data);
  },

});

var WebFontLink = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    id: React.PropTypes.string.isRequired,
  },

  render: function () {
    var id = encodeURIComponent(this.props.id);
    var href = '//fonts.googleapis.com/css?family=' + id + ':400';
    return (
      /* jshint ignore: start */
      <link href={href} rel='stylesheet' type='text/css' />
      /* jshint ignore: end */
    );
  },

});

var StyleSheet = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function () {
    return {
      colors: AppStore.getState().colors,
      font: AppStore.getState().font,
    };
  },

  componentDidMount: function () {
    this.listenTo(AppStore, this._onChange);
  },

  render: function () {
    /* jshint ignore: start */

    var webFontLink = '';
    if (this.state.font.web) {
      webFontLink = <WebFontLink id={this.state.font.name} />;
    }

    return (
      <div className="sexy-stylesheet">
        <ColorStyle id='background' data={this.state.colors.background} />
        <ColorStyle id='foreground' data={this.state.colors.foreground} />
        <ColorStyle id='0' data={this.state.colors[0]} />
        <ColorStyle id='1' data={this.state.colors[1]} />
        <ColorStyle id='2' data={this.state.colors[2]} />
        <ColorStyle id='3' data={this.state.colors[3]} />
        <ColorStyle id='4' data={this.state.colors[4]} />
        <ColorStyle id='5' data={this.state.colors[5]} />
        <ColorStyle id='6' data={this.state.colors[6]} />
        <ColorStyle id='7' data={this.state.colors[7]} />
        <ColorStyle id='8' data={this.state.colors[8]} />
        <ColorStyle id='9' data={this.state.colors[9]} />
        <ColorStyle id='10' data={this.state.colors[10]} />
        <ColorStyle id='11' data={this.state.colors[11]} />
        <ColorStyle id='12' data={this.state.colors[12]} />
        <ColorStyle id='13' data={this.state.colors[13]} />
        <ColorStyle id='14' data={this.state.colors[14]} />
        <ColorStyle id='15' data={this.state.colors[15]} />
        <FontStyle id='font' data={_.clone(this.state.font)} />
        {webFontLink}
      </div>
    );

    /* jshint ignore: end */
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  }
});

module.exports = StyleSheet;
