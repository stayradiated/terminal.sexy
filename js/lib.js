(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

  openWindow: function (id) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_WINDOW,
      id: id
    });
  },

  setAllColors: function (colors) {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_ALL_COLORS,
      colors: colors
    });
  }

};

module.exports = AppActions;

},{"../constants/AppConstants":13,"../dispatchers/AppDispatcher":14}],2:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');
var ReactWM = require('reactwm');
var AppStore = require('../stores/AppStore');
var WindowStore = require('../stores/WindowStore');
var Header = require('./Header.react');
var StyleSheet = require('./Stylesheet.react');

var getAppState = function () {
  return {
    manager: WindowStore.getManager(),
    colors: AppStore.getColors()
  };
};

var App = React.createClass({displayName: 'App',

  getInitialState: function () {
    return getAppState();
  },

  componentDidMount: function () {
    AppStore.on('change', this._onChange);
  },

  componentWillUnmount: function () {
    AppStore.off('change', this._onChange);
  },

  render: function () {
    return (
      React.DOM.div( {className:"app"}, 
        Header(null ),
        ReactWM( {manager:this.state.manager} ),
        StyleSheet( {colors:this.state.colors} )
      )
    );
  },

  _onChange: function () {
    this.setState(getAppState());
  }

});

module.exports = App;

},{"../stores/AppStore":29,"../stores/WindowStore":33,"./Header.react":5,"./Stylesheet.react":9,"react":"M6d2gk","reactwm":"OGX3iI"}],3:[function(require,module,exports){
/** @jsx React.DOM */var _ = require('lodash');
var React = require('react');
var AppStore = require('../stores/AppStore');

var colorNames = [
  'bg', 'fg',
  0, 8, 1, 9, 2, 10, 3, 11,
  4, 12, 5, 13, 6, 14, 7, 15
];

var getEditorState = function () {
  return {
    colors: AppStore.getColors()
  };
};

var Editor = React.createClass({displayName: 'Editor',

  getInitialState: function () {
    return getEditorState();
  },

  componentDidMount: function () {
    AppStore.on('change', this._onChange);
  },

  componentWillUnmount: function () {
    AppStore.off('change', this._onChange);
  },

  render: function () {
    var colors = AppStore.getColors();

    var palette = _.map(colorNames, function (name) {
      if (name === 'bg') id = 'background';
      else if (name == 'fg') id = 'foreground';
      else id = name;

      return (
        React.DOM.div( {key:name, className:"block"}, 
          React.DOM.label( {className:"foreground-8"}, name),
          React.DOM.div( {className:'color background-'+name}, 
            colors[id].toHexString()
          )
        )
      );
    }, this);

    return (
      React.DOM.div( {className:"editor"}, 
        React.DOM.div( {className:"palette"}, 
          palette
        )
      )
    );
  },

  _onChange: function () {
    this.setState(getEditorState());
  }

});

module.exports = Editor;

},{"../stores/AppStore":29,"lodash":"K2RcUv","react":"M6d2gk"}],4:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');
var termcolors = require('termcolors');
var AppStore = require('../stores/AppStore');

var Export = React.createClass({displayName: 'Export',

  getInitialState: function () {
    return {
      text: ''
    };
  },

  handleClick: function () {
    var colors = AppStore.getColors();
    var type = this.refs.select.getDOMNode().value;
    this.setState({
      text: termcolors[type].export(colors)
    });
  },

  render: function () {
    return (
      React.DOM.div( {className:"export"}, 
        React.DOM.select( {ref:"select", defaultValue:"xresources"}, 
          React.DOM.option( {value:"gnome"}, "Gnome Terminal"),
          React.DOM.option( {value:"guake"}, "Guake"),
          React.DOM.option( {value:"iterm"}, "iTerm2"),
          React.DOM.option( {value:"konsole"}, "Konsole"),
          React.DOM.option( {value:"mintty"}, "MinTTY"),
          React.DOM.option( {value:"putty"}, "Putty"),
          React.DOM.option( {value:"terminator"}, "Terminator"),
          React.DOM.option( {value:"termite"}, "Termite"),
          React.DOM.option( {value:"xfce"}, "XFCE4 Terminal"),
          React.DOM.option( {value:"xresources"}, "Xresources")
        ),
        React.DOM.button( {onClick:this.handleClick}, "Export"),
        React.DOM.div( {className:"textarea"}, 
          React.DOM.textarea( {value:this.state.text, readOnly:true, spellCheck:"false",
            className:"background-bg foreground-fg", ref:"textarea"} )
        )
      )
    );
  }

});

module.exports = Export;

},{"../stores/AppStore":29,"react":"M6d2gk","termcolors":"39CK3B"}],5:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');
var AppActions = require('../actions/AppActions');

var Header = React.createClass({displayName: 'Header',

  open: function (name) {
    AppActions.openWindow(name);
  },

  render: function () {
    return (
      React.DOM.header( {className:"header foreground-fg background-bg"}, 
        React.DOM.h1(null, "terminal.sexy"),
        React.DOM.ul(null, 
          React.DOM.li( {onClick:this.open.bind(this, 'templates')}, "Templates"),
          React.DOM.li( {onClick:this.open.bind(this, 'schemes')}, "Schemes"),
          React.DOM.li( {onClick:this.open.bind(this, 'export')}, "Export"),
          React.DOM.li( {onClick:this.open.bind(this, 'import')}, "Import"),
          React.DOM.li( {onClick:this.open.bind(this, 'editor')}, "Editor")
        )
      )
    );
  }

});

module.exports = Header;

},{"../actions/AppActions":1,"react":"M6d2gk"}],6:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');
var termcolors = require('termcolors');
var AppActions = require('../actions/AppActions');

var Import = React.createClass({displayName: 'Import',

  handleClick: function () {
    var type = this.refs.select.getDOMNode().value;
    var text = this.refs.textarea.getDOMNode().value;
    var colors = termcolors[type].import(text);
    colors = termcolors.defaults.fill(colors);
    AppActions.setAllColors(colors);
  },

  render: function () {
    return (
      React.DOM.div( {className:"import"}, 
        React.DOM.select( {ref:"select", defaultValue:"xresources"}, 
          React.DOM.option( {value:"iterm"}, "iTerm2"),
          React.DOM.option( {value:"termite"}, "Termite"),
          React.DOM.option( {value:"url"}, "URL"),
          React.DOM.option( {value:"xresources"}, "Xresources")
        ),
        React.DOM.button( {onClick:this.handleClick}, "Import"),
        React.DOM.div( {className:"textarea"}, 
          React.DOM.textarea( {spellCheck:"false", className:"background-bg foreground-fg", ref:"textarea"} )
        )
      )
    );
  }

});

module.exports = Import;

},{"../actions/AppActions":1,"react":"M6d2gk","termcolors":"39CK3B"}],7:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');
var AppActions = require('../actions/AppActions');

var SchemeItem = React.createClass({displayName: 'SchemeItem',

  handleClick: function () {
    AppActions.setAllColors(this.props.scheme.colors);
  },

  render: function () {
    return (
      React.DOM.li( {className:"scheme-item", onClick:this.handleClick}, 
        React.DOM.span( {className:"name"}, this.props.scheme.name),
        React.DOM.span( {className:"foreground-7 author"}, this.props.scheme.author)
      )
    );
  }

});

module.exports = SchemeItem;

},{"../actions/AppActions":1,"react":"M6d2gk"}],8:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');
var SchemeStore = require('../stores/SchemeStore');
var SchemeItem = require('./SchemeItem.react');

var Schemes = React.createClass({displayName: 'Schemes',

  render: function () {

    var schemes = SchemeStore.getSchemes().map(function (scheme) {
      return SchemeItem( {key:scheme.name, scheme:scheme} );
    });

    return (
      React.DOM.ul( {className:"schemes background-bg foreground-fg"}, 
        schemes
      )
    );
  }

});

module.exports = Schemes;

},{"../stores/SchemeStore":31,"./SchemeItem.react":7,"react":"M6d2gk"}],9:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');
var CSS = require('../formats/css');

var StyleSheet = React.createClass({displayName: 'StyleSheet',

  render: function () {
    var styles = CSS.export(this.props.colors);

    return (
      React.DOM.style( {dangerouslySetInnerHTML:{__html: styles}} )
    );
  }

});

module.exports = StyleSheet;

},{"../formats/css":16,"react":"M6d2gk"}],10:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');
var TemplateStore = require('../stores/TemplateStore');

var Template = React.createClass({displayName: 'Template',

  componentDidMount: function () {
    var self = this;
    TemplateStore.load(this.props.key).then(function () {
      self.forceUpdate();
    } );
  },

  render: function () {
    var content = TemplateStore.get(this.props.key);

    return (
      React.DOM.div( {className:"template"}, 
        React.DOM.pre( {className:"text", dangerouslySetInnerHTML:{__html: content}} )
      )
    );
  }

});

module.exports = Template;

},{"../stores/TemplateStore":32,"react":"M6d2gk"}],11:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');
var TemplateStore = require('../stores/TemplateStore');
var TemplateBrowserItem = require('./TemplateBrowserItem.react');

var getTemplateBrowserState = function () {
  return {
    templates: TemplateStore.availableTemplates()
  };
};

var TemplateBrowser = React.createClass({displayName: 'TemplateBrowser',

  getInitialState: function () {
    return getTemplateBrowserState();
  },

  componentDidMount: function () {
    TemplateStore.on('change', this._onChange);
  },

  componentWillUnmount: function () {
    TemplateStore.off('change', this._onChange);
  },

  render: function () {

    var templates = this.state.templates.map(function (id) {
      return TemplateBrowserItem( {key:id} );
    });

    return (
      React.DOM.div( {className:"template-browser"}, 
        templates
      )
    );
  },

  _onChange: function () {
    this.setState(getTemplateBrowserState());
  }

});

module.exports = TemplateBrowser;

},{"../stores/TemplateStore":32,"./TemplateBrowserItem.react":12,"react":"M6d2gk"}],12:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');
var AppActions = require('../actions/AppActions');

var TemplateBrowserItem = React.createClass({displayName: 'TemplateBrowserItem',

  handleClick: function () {
    AppActions.openWindow('template::' + this.props.key);
  },

  render: function () {

    var sections = this.props.key.split('/');
    var name = sections.splice(sections.length - 1, 1);
    var category = sections.join('/') + '/';

    return (
      React.DOM.div( {className:"template-browser-item foreground-fg", onClick:this.handleClick}, 
        React.DOM.span( {className:"category foreground-2"}, category),
        React.DOM.span( {className:"name"}, name)
      )
    );
  }

});

module.exports = TemplateBrowserItem;

},{"../actions/AppActions":1,"react":"M6d2gk"}],13:[function(require,module,exports){
var _ = require('lodash');
module.exports = _.forIn({

  OPEN_WINDOW: null,
  SET_ALL_COLORS: null

}, function (value, key, obj) { obj[key] = key; });

},{"lodash":"K2RcUv"}],14:[function(require,module,exports){
var _ = require('lodash');
var Dispatcher = require('./Dispatcher');

var AppDispatcher = _.extend(Dispatcher, {

  handleViewAction: function (action) {
    return this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }

});

module.exports = AppDispatcher;

},{"./Dispatcher":15,"lodash":"K2RcUv"}],15:[function(require,module,exports){
var Promise = require('bluebird');
var _ = require('lodash');

var _callbacks = [];
var _promises = [];

var _addPromise = function (callback, payload) {
  _promises.push(new Promise(function (resolve, reject) {
    if (callback(payload)) {
      resolve(payload);
    } else {
      reject(new Error('Dispatcher callback unsuccessful'));
    }
  }));
};

var _clearPromises = function () {
  _promises = [];
};

var Dispatcher = {

  /**
   * Register
   * - callback (function) : the callback to be registered
   * > number : the index of the callback
   */

  register: function (callback) {
    return _callbacks.push(callback) - 1;
  },


  /**
   * Dispatch
   * - payload (object) : the data from the action
   */

  dispatch: function (payload) {
    _callbacks.forEach(function (callback) {
      _addPromise(callback, payload);
    });
    return Promise.all(_promises).then(_clearPromises);
  }

};

module.exports = Dispatcher;

},{"bluebird":"EjIH/G","lodash":"K2RcUv"}],16:[function(require,module,exports){
var _ = require('lodash');

var termcolors = require('termcolors');
var tiny = require('tinytinycolor');

var template = ".foreground-alt{color:{{=c.alt}} !important;}\n.background-alt{background:{{=c.alt}} !important;}\n.foreground-bg{color:{{=c.background}} !important;}\n.background-bg{background:{{=c.background}} !important;}\n.foreground-fg{color:{{=c.foreground}} !important;}\n.background-fg{background:{{=c.foreground}} !important;}\n.foreground-0{color:{{=c[0]}} !important;}\n.background-0{background:{{=c[0]}} !important;}\n.foreground-1{color:{{=c[1]}} !important;}\n.background-1{background:{{=c[1]}} !important;}\n.foreground-2{color:{{=c[2]}} !important;}\n.background-2{background:{{=c[2]}} !important;}\n.foreground-3{color:{{=c[3]}} !important;}\n.background-3{background:{{=c[3]}} !important;}\n.foreground-4{color:{{=c[4]}} !important;}\n.background-4{background:{{=c[4]}} !important;}\n.foreground-5{color:{{=c[5]}} !important;}\n.background-5{background:{{=c[5]}} !important;}\n.foreground-6{color:{{=c[6]}} !important;}\n.background-6{background:{{=c[6]}} !important;}\n.foreground-7{color:{{=c[7]}} !important;}\n.background-7{background:{{=c[7]}} !important;}\n.foreground-8{color:{{=c[8]}} !important;}\n.background-8{background:{{=c[8]}} !important;}\n.foreground-9{color:{{=c[9]}} !important;}\n.background-9{background:{{=c[9]}} !important;}\n.foreground-10{color:{{=c[10]}} !important;}\n.background-10{background:{{=c[10]}} !important;}\n.foreground-11{color:{{=c[11]}} !important;}\n.background-11{background:{{=c[11]}} !important;}\n.foreground-12{color:{{=c[12]}} !important;}\n.background-12{background:{{=c[12]}} !important;}\n.foreground-13{color:{{=c[13]}} !important;}\n.background-13{background:{{=c[13]}} !important;}\n.foreground-14{color:{{=c[14]}} !important;}\n.background-14{background:{{=c[14]}} !important;}\n.foreground-15{color:{{=c[15]}} !important;}\n.background-15{background:{{=c[15]}} !important;}\n\n.window {\n  color: {{=c.foreground}} !important;\n  background: {{=c[0]}} !important;\n}\n\n.window .title {\n  color: {{=c.foreground}} !important;\n}\n\n.window .content {\n  background: {{=c.background}} !important;\n}\n";

module.exports = {
  export: termcolors.export(template, function (colors) {
    hex = _.mapValues(colors, function (color) {
      return color.toHexString();
    });

    var contrast = colors.background.toHsl().l > 0.5 ? 'darken' : 'lighten';
    hex.alt = tiny[contrast](colors.background, 7).toHexString();

    return hex;
  })
};

},{"lodash":"K2RcUv","termcolors":"39CK3B","tinytinycolor":"2EHlwd"}],17:[function(require,module,exports){
(function (Buffer){
var _ = require('lodash');
var base64 = require('urlsafe-base64');
var tiny = require('tinytinycolor');

var ORDER = [
  'background', 'foreground',
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
];


module.exports = {

  /*
   * url.import
   *
   * Convert a 72 byte string into a collection of colors
   *
   * - input (string)
   * > output (object)
   */

  import: function (input) {
    var output = {};

    if (input[0] === '#') {
      input = input.slice(1);
    }

    if (input.length !== 72) {
      return false;
    }

    var buffer = base64.decode(input);

    for (var i = 0, len = ORDER.length; i < len; i++) {
      var id = ORDER[i];
      var color = buffer.slice(i * 3, i * 3 + 3).toString('hex');
      output[id] = tiny(color);
    }

    return output;
  },


  /*
   * url.export
   *
   * Convert into a 72 byte url-base64 string to save space
   *
   * - input (object)
   * > output (string)
   */

  export: function (input) {
    var array = _.chain(ORDER).map(function (name) {
      return input[name].toRgbArray();
    }).flatten().value();

    var buffer = new Buffer(array);
    return base64.encode(buffer);
  }

};

}).call(this,require("buffer").Buffer)
},{"buffer":34,"lodash":"K2RcUv","tinytinycolor":"2EHlwd","urlsafe-base64":"MzlI2a"}],18:[function(require,module,exports){
/** @jsx React.DOM */var $ = require('jquery');
var React = require('react');
var App = require('./components/App.react');

$(function () {
  React.renderComponent(App(null ), document.body);
});

},{"./components/App.react":2,"jquery":"HlZQrA","react":"M6d2gk"}],19:[function(require,module,exports){
module.exports={
	"name": "Classy Touch",
	"author": "Jason 'Graawr'",
	"color": [
		"#303030",
		"#BF1E2D",
		"#D7D7D7",
		"#666666",
		"#FFFFFF",
		"#C3143B",
		"#D4D4D4",
		"#ebebeb",
		"#474747",
		"#E7212A",
		"#E6E6E6",
		"#808080",
		"#ebebeb",
		"#E82752",
		"#EDEDED",
		"#cccccc"
	],
	"foreground": "#ebebeb",
	"background": "#151515"
}


},{}],20:[function(require,module,exports){
module.exports={
	"name": "erosion",
	"color": [
		"#332d29",
		"#8c644c",
		"#c4be90",
		"#bfba92",
		"#646a6d",
		"#6d6871",
		"#3b484a",
		"#504339",
		"#817267",
		"#9f7155",
		"#bec17a",
		"#fafac0",
		"#626e74",
		"#756f7b",
		"#444d4e",
		"#9a875f"
	],
	"foreground": "#bea492",
	"background":  "#181512"
}

},{}],21:[function(require,module,exports){
module.exports={
	"name": "jetplane-dark",
	"color": [
		"#303030",
		"#fa6101",
		"#8e7d21",
		"#fcc601",
		"#014d49",
		"#c01331",
		"#0b5c71",
		"#ffffff"
	],
	"background": "#181513",
	"foreground": "#edf9ff"
}

},{}],22:[function(require,module,exports){
module.exports={
	"name": "jetplane",
	"color": [
		"#404040",
		"#c43014",
		"#49501a",
		"#fec408",
		"#012a3e",
		"#2c1f2c",
		"#1e5246",
		"#eeeeee",
		"#505050",
		"#fa6101",
		"#8e7d21",
		"#fcc601",
		"#014d49",
		"#c01331",
		"#0b5c71",
		"#ffffff"
	],
	"foreground": "#15181c",
	"background": "#edf9ff"
}

},{}],23:[function(require,module,exports){
module.exports={
	"name": "kasugano",
	"author": "Kori Ayakashi",
	"color": [
		"#3D3D3D",
		"#6673BF",
		"#3EA290",
		"#B0EAD9",
		"#31658C",
		"#596196",
		"#8292B2",
		"#C8CACC",
		"#4D4D4D", 
		"#899AFF", 
		"#52AD91",
		"#98C9BB",
		"#477AB3",
		"#7882BF",
		"#95A7CC",
		"#EDEFF2"
	],
	"foreground": "#ffffff",
	"background": "#1b1b1b"
}


},{}],24:[function(require,module,exports){
module.exports={
	"name": "monokai",
	"author": "Wimer Hazenberg (http://monokai.nl)",
	"color": [
		"#49483e",
		"#f92672",
		"#a6e22e",
		"#fd971f",
		"#66d9ef",
		"#ae81ff",
		"#a1efe4",
		"#75715e"
	],
	"foreground": "#f8f8f2",
	"background": "#272822"
}

},{}],25:[function(require,module,exports){
module.exports={
	"name": "My first colorscheme!",
	"author": "jmbi",
	"color": [
		"#5A7260",
		"#8F423C",
		"#BBBB88",
		"#F9D25B",
		"#E0BA69",
		"#709289",
		"#D13516",
		"#EFE2E0",
		"#8DA691",
		"#EEAA88",
		"#CCC68D",
		"#EEDD99",
		"#C9B957",
		"#FFCBAB",
		"#C25431",
		"#F9F1ED"
	],
	"foreground": "#ffffff",
	"background": "#1e1e1e"
}

},{}],26:[function(require,module,exports){
module.exports={
	"name": "not_monokai",
	"author": "crshd (http://crshd.github.io)",
	"color": [
		"#383830",
		"#cc6633",
		"#86a24e",
		"#cc9853",
		"#a59f85",
		"#ae81df",
		"#819fa4",
		"#75715e"
	],
	"foreground": "#f8f8f2",
	"background":  "#272822"
}

},{}],27:[function(require,module,exports){
module.exports={
	"name": "papirus-dark",
	"author": "franksn",
	"color": [
		"#717370",
		"#8c735a",
		"#aec495",
		"#bfbb99",
		"#88a1ba",
		"#6d6871",
		"#5c5346",
		"#c8b972",
		"#2e2c28",
		"#998a7a",
		"#b4cc99",
		"#e6e3ca",
		"#88a1ba",
		"#948d99",
		"#7a8735",
		"#e4dd96"
	],
	"background": "#2e2c28",
	"foreground": "#d1c3b8"
}

},{}],28:[function(require,module,exports){
module.exports={
	"name": "tillwhen",
	"color": [
		"#595351",
		"#917078",
		"#99c293",
		"#f7d263",
		"#809ba8",
		"#703269",
		"#93b2c2",
		"#c3b17d"
	],
	"foreground": "#edf9ff",
	"background": "#3d3032"
}

},{}],29:[function(require,module,exports){
var _ = require('lodash');
var Signals = require('signals');
var termcolors = require('termcolors');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var url = require('../formats/url');

var _colors = url.import(location.hash);
if (_colors === false) {
  _colors = _.clone(termcolors.defaults.colors);
}

var AppStore = Signals.convert({

  getColors: function () {
    return _colors;
  }

});

AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.SET_ALL_COLORS:
      _colors = action.colors;
      break;

    default:
      return true;
  }

  AppStore.emit('change');

  return true;

});

AppStore.on('change', function () {
  location.hash = url.export(_colors);
});

module.exports = AppStore;

},{"../constants/AppConstants":13,"../dispatchers/AppDispatcher":14,"../formats/url":17,"lodash":"K2RcUv","signals":"/C63EU","termcolors":"39CK3B"}],30:[function(require,module,exports){
var LocalStore = {

  save: function (name, content) {
    localStorage[name] = JSON.stringify(content);
  },

  load: function (name) {
    var data;
    try {
      data = JSON.parse(localStorage[name]);
    } catch (e) {
      data = undefined;
    }
    return data;
  }

};

module.exports = LocalStore;

},{}],31:[function(require,module,exports){
var _ = require('lodash');

var Signals = require('signals');

var tiny = require('tinytinycolor');
var husl = require('husl');

tiny.prototype.toHuslArray = function () {
  return husl.fromRGB(this._r/255, this._g/255, this._b/255);
};

tiny.prototype.toHusl = function () {
  var colors = this.toHuslArray();
  return {
    h: colors[0],
    s: colors[1],
    l: colors[2]
  };
};


var loadScheme = function (scheme) {
  var output = {
    name: scheme.name || '',
    author: scheme.author || '',
    colors: {
      background: tiny(scheme.background),
      foreground: tiny(scheme.foreground)
    }
  };

  var colors = scheme.color.map(tiny);

  if (colors.length == 8) {
    colors.forEach(function (color, id) {
      var hsl = color.toHusl();
      if (hsl.l < 80) {
        hsl.l += 10;
      } else {
        hsl.l -= 10;
      }
      colors[id + 8] = tiny(husl.toHex(hsl.h,hsl.s,hsl.l));
    });
  }

  _.extend(output.colors, colors);
  return output;
};

var _schemes = [
  require('../schemes/classy-touch'),
  require('../schemes/erosion'),
  require('../schemes/jetplane-dark'),
  require('../schemes/jetplane'),
  require('../schemes/kasugano'),
  require('../schemes/monokai'),
  require('../schemes/my-first-colorscheme'),
  require('../schemes/not_monokai'),
  require('../schemes/papirus-dark'),
  require('../schemes/tillwhen')
].map(loadScheme);

var SchemeStore = Signals.convert({

  getSchemes: function () {
    return _schemes;
  }

});

module.exports = SchemeStore;

},{"../schemes/classy-touch":19,"../schemes/erosion":20,"../schemes/jetplane":22,"../schemes/jetplane-dark":21,"../schemes/kasugano":23,"../schemes/monokai":24,"../schemes/my-first-colorscheme":25,"../schemes/not_monokai":26,"../schemes/papirus-dark":27,"../schemes/tillwhen":28,"husl":"6E6oPq","lodash":"K2RcUv","signals":"/C63EU","tinytinycolor":"2EHlwd"}],32:[function(require,module,exports){
var $ = require('jquery');
var Signals = require('signals');

var _templates = {};

var FOLDER = 'templates/';
var EXT = '.html';

var load = function (id) {
  return $.get(FOLDER + id + EXT).then(function (content) {
    _templates[id] = content;
    TemplateStore.emit('change');
    return content;
  });
};

var TemplateStore = Signals.convert({

  availableTemplates: function () {
    // TODO: replace with something dynamic
    return [
      'vim/default/bash',
      'vim/default/c++',
      'vim/default/fortran',
      'vim/default/haskell',
      'vim/default/html',
      'vim/default/java',
      'vim/default/javascript',
      'vim/default/latex',
      'vim/default/lua',
      'vim/default/perl',
      'vim/default/php',
      'vim/default/python',
      'vim/default/ruby',
      'vim/default/sql',
      'vim/default-bright/bash',
      'vim/default-bright/c++',
      'vim/default-bright/fortran',
      'vim/default-bright/haskell',
      'vim/default-bright/html',
      'vim/default-bright/java',
      'vim/default-bright/javascript',
      'vim/default-bright/latex',
      'vim/default-bright/lua',
      'vim/default-bright/perl',
      'vim/default-bright/php',
      'vim/default-bright/python',
      'vim/default-bright/ruby',
      'vim/default-bright/sql',
      'vim/stayrad/bash',
      'vim/stayrad/c++',
      'vim/stayrad/fortran',
      'vim/stayrad/haskell',
      'vim/stayrad/html',
      'vim/stayrad/java',
      'vim/stayrad/javascript',
      'vim/stayrad/latex',
      'vim/stayrad/lua',
      'vim/stayrad/perl',
      'vim/stayrad/php',
      'vim/stayrad/python',
      'vim/stayrad/ruby',
      'vim/stayrad/sql',
      'misc/columns',
      'misc/rows'
    ];
  },

  allLoadedTemplates: function () {
    return _templates;
  },

  isLoaded: function (id) {
    return _templates.hasOwnProperty(id);
  },

  get: function (id) {
    if (! TemplateStore.isLoaded(id)) return false;
    return _templates[id];
  },

  load: function (id) {
    return load(id);
  }

});

module.exports = TemplateStore;

},{"jquery":"HlZQrA","signals":"/C63EU"}],33:[function(require,module,exports){
var _ = require('lodash');
var ReactWM = require('reactwm');
var Signals = require('signals');
var AppStore = require('../stores/AppStore');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var LocalStore = require('../stores/LocalStore');

var Editor = require('../components/Editor.react');
var Import = require('../components/Import.react');
var Export = require('../components/Export.react');
var Schemes = require('../components/Schemes.react');
var Template = require('../components/Template.react');
var TemplateBrowser = require('../components/TemplateBrowser.react');

var STORAGE_ID = 'window::store';

var windows = {

  editor: {
    component: Editor,
    title: 'Editor',
    width: 460,
    height: 700
  },

  import: {
    component: Import,
    title: 'Import',
    width: 330,
    height: 330,
    x: 500
  },

  export: {
    component: Export,
    title: 'Export',
    width: 330,
    height: 330,
    x: 500,
    y: 370
  },

  schemes: {
    component: Schemes,
    title: 'Schemes',
    width: 330,
    height: 330,
    x: 850
  },

  templates: {
    component: TemplateBrowser,
    title: 'Template Browser',
    width: 500,
    height: 200,
    x: 850,
    y: 370
  },

  template: function (template) {
    return {
      component: Template,
      id: 'template-' + template,
      title: 'Template: ' + template,
      width: 730,
      height: 580
    };
  }

};

var getWindow = function (id) {
  var _id = id.split('::');
  id = _id.splice(0, 1)[0];
  data = _id.join('::');

  var info = windows[id];

  if (_.isFunction(info)) {
    console.log('is function');
    info = info(data);
  }
  else if (_.isObject(info)) {
    console.log('is object');
    info = _.clone(info);
  }

  if (! _.isObject(info)) {
    return undefined;
  }

  console.log({
    id:id, 
    data:data,
    info:info
  });

  info.component = info.component({ key: data });

  return info;
};

var manager = (function () {
  var localData = LocalStore.load(STORAGE_ID);
  var manager = new ReactWM.Manager(localData);

  manager.openWindows().forEach(function (window) {
    window.setComponent(getWindow(window.id).component);
  });

  var _saveLayout = _.throttle(function () {
    LocalStore.save(STORAGE_ID, manager.toJSON());
  }, 500);

  manager.on('change', _saveLayout);
  manager.on('change:windows', _saveLayout);

  return manager;
}());

var WindowStore = Signals.convert({

  getManager: function () {
    return manager;
  },

  open: function (id) {
    console.log('opening window', id);
    var window = getWindow(id);
    console.log(window);
    var el = window.component;
    manager.open(id, el, window);
  }

});


AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.OPEN_WINDOW:
      WindowStore.open(action.id);
      break;

    default:
      return true;
  }

  WindowStore.emit('change');

  return true;

});

module.exports = WindowStore;

},{"../components/Editor.react":3,"../components/Export.react":4,"../components/Import.react":6,"../components/Schemes.react":8,"../components/Template.react":10,"../components/TemplateBrowser.react":11,"../constants/AppConstants":13,"../dispatchers/AppDispatcher":14,"../stores/AppStore":29,"../stores/LocalStore":30,"lodash":"K2RcUv","reactwm":"OGX3iI","signals":"/C63EU"}],34:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

},{"base64-js":35,"ieee754":36}],35:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var ZERO   = '0'.charCodeAt(0)
	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	module.exports.toByteArray = b64ToByteArray
	module.exports.fromByteArray = uint8ToBase64
}())

},{}],36:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}]},{},[18])