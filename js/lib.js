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

},{"../constants/AppConstants":12,"../dispatchers/AppDispatcher":13}],2:[function(require,module,exports){
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

},{"../stores/AppStore":28,"../stores/WindowStore":32,"./Header.react":5,"./Stylesheet.react":9,"react":"M6d2gk","reactwm":"OGX3iI"}],3:[function(require,module,exports){
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

},{"../stores/AppStore":28,"lodash":"K2RcUv","react":"M6d2gk"}],4:[function(require,module,exports){
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
        React.DOM.select( {ref:"select", defaultValue:"xresources", className:"background-alt"}, 
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
        React.DOM.button( {onClick:this.handleClick, className:"background-alt"}, "Export"),
        React.DOM.div( {className:"textarea"}, 
          React.DOM.textarea( {value:this.state.text, readOnly:true, spellCheck:"false",
            className:"background-bg", ref:"textarea"} )
        )
      )
    );
  }

});

module.exports = Export;

},{"../stores/AppStore":28,"react":"M6d2gk","termcolors":"39CK3B"}],5:[function(require,module,exports){
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
          React.DOM.li( {onClick:this.open.bind(this, 'editor')}, "Editor"),
          React.DOM.li( {onClick:this.open.bind(this, 'templates')}, "Templates"),
          React.DOM.li( {onClick:this.open.bind(this, 'schemes')}, "Schemes"),
          React.DOM.div( {className:"seperator"} ),
          React.DOM.li( {onClick:this.open.bind(this, 'import')}, "Import"),
          React.DOM.li( {onClick:this.open.bind(this, 'export')}, "Export")
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
        React.DOM.select( {ref:"select", defaultValue:"xresources", className:"background-alt"}, 
          React.DOM.option( {value:"iterm"}, "iTerm2"),
          React.DOM.option( {value:"termite"}, "Termite"),
          React.DOM.option( {value:"url"}, "URL"),
          React.DOM.option( {value:"xresources"}, "Xresources")
        ),
        React.DOM.button( {onClick:this.handleClick, className:"background-alt"}, "Import"),
        React.DOM.div( {className:"textarea"}, 
          React.DOM.textarea( {spellCheck:"false", className:"background-bg", ref:"textarea"} )
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

},{"../stores/SchemeStore":30,"./SchemeItem.react":7,"react":"M6d2gk"}],9:[function(require,module,exports){
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

},{"../formats/css":15,"react":"M6d2gk"}],10:[function(require,module,exports){
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

},{"../stores/TemplateStore":31,"react":"M6d2gk"}],11:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');
var Ranger = require('react-ranger');
var TemplateStore = require('../stores/TemplateStore');
var AppActions = require('../actions/AppActions');

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

  handleExecute: function (item) {
    console.log(item.path);
    AppActions.openWindow('template::' + item.path);
  },

  render: function () {
    return (
      Ranger(
        {data:Ranger.parseList(this.state.templates),
        onExecute:this.handleExecute}
        )
    );
  },

  _onChange: function () {
    this.setState(getTemplateBrowserState());
  }

});

module.exports = TemplateBrowser;

},{"../actions/AppActions":1,"../stores/TemplateStore":31,"react":"M6d2gk","react-ranger":"LH8Omh"}],12:[function(require,module,exports){
var _ = require('lodash');
module.exports = _.forIn({

  OPEN_WINDOW: null,
  SET_ALL_COLORS: null

}, function (value, key, obj) { obj[key] = key; });

},{"lodash":"K2RcUv"}],13:[function(require,module,exports){
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

},{"./Dispatcher":14,"lodash":"K2RcUv"}],14:[function(require,module,exports){
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

},{"bluebird":"EjIH/G","lodash":"K2RcUv"}],15:[function(require,module,exports){
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

},{"lodash":"K2RcUv","termcolors":"39CK3B","tinytinycolor":"2EHlwd"}],16:[function(require,module,exports){
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
},{"buffer":"cTGqya","lodash":"K2RcUv","tinytinycolor":"2EHlwd","urlsafe-base64":"MzlI2a"}],17:[function(require,module,exports){
/** @jsx React.DOM */var $ = require('jquery');
var React = require('react');
var App = require('./components/App.react');

$(function () {
  React.renderComponent(App(null ), document.body);
});

},{"./components/App.react":2,"jquery":"HlZQrA","react":"M6d2gk"}],18:[function(require,module,exports){
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


},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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


},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{"../constants/AppConstants":12,"../dispatchers/AppDispatcher":13,"../formats/url":16,"lodash":"K2RcUv","signals":"/C63EU","termcolors":"39CK3B"}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{"../schemes/classy-touch":18,"../schemes/erosion":19,"../schemes/jetplane":21,"../schemes/jetplane-dark":20,"../schemes/kasugano":22,"../schemes/monokai":23,"../schemes/my-first-colorscheme":24,"../schemes/not_monokai":25,"../schemes/papirus-dark":26,"../schemes/tillwhen":27,"husl":"6E6oPq","lodash":"K2RcUv","signals":"/C63EU","tinytinycolor":"2EHlwd"}],31:[function(require,module,exports){
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

},{"jquery":"HlZQrA","signals":"/C63EU"}],32:[function(require,module,exports){
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

},{"../components/Editor.react":3,"../components/Export.react":4,"../components/Import.react":6,"../components/Schemes.react":8,"../components/Template.react":10,"../components/TemplateBrowser.react":11,"../constants/AppConstants":12,"../dispatchers/AppDispatcher":13,"../stores/AppStore":28,"../stores/LocalStore":29,"lodash":"K2RcUv","reactwm":"OGX3iI","signals":"/C63EU"}]},{},[17])