(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _merge = require('./utilities/merge');

var _merge2 = _interopRequireDefault(_merge);

var _findRefs = require('./utilities/findRefs');

var _findRefs2 = _interopRequireDefault(_findRefs);

var _parseAttributeProps = require('./utilities/parseAttributeProps');

var _parseAttributeProps2 = _interopRequireDefault(_parseAttributeProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
  function Component(element, parent) {
    _classCallCheck(this, Component);

    this.element = element;
    this.parent = parent;
    this.children = [];
    this.state = {};
    this.refs = {};
    this._attrProps = element.dataset.props;
    this.props = (0, _merge2.default)(this.constructor.defaultProps, (0, _parseAttributeProps2.default)(this.element.dataset.componentId, this._attrProps, this.parent));
  }

  _createClass(Component, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return true;
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {}
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render(props, state) {}
  }, {
    key: 'setState',
    value: function setState(newState) {
      this.state = (0, _merge2.default)(this.state, newState);
      this._update();
    }
  }, {
    key: '_init',
    value: function _init(children) {
      this.refs = (0, _findRefs2.default)(this.element, this.children);
      this.componentWillMount();
      var nextProps = (0, _merge2.default)(this.props, (0, _parseAttributeProps2.default)(this.element.dataset.componentId, this._attrProps, this.parent));
      this.props = nextProps;
      this.render(nextProps, this.state);
      this.componentDidMount();
    }
  }, {
    key: '_update',
    value: function _update() {
      var nextProps = (0, _merge2.default)(this.props, (0, _parseAttributeProps2.default)(this.element.dataset.componentId, this._attrProps, this.parent));
      this.componentWillReceiveProps(nextProps);
      this.props = nextProps;

      if (this.shouldComponentUpdate() === false) {
        return;
      }

      this.componentWillUpdate();
      this.render(this.props, this.state);
      this.componentDidUpdate();
      this.children.forEach(function (child) {
        return child._update();
      });
    }
  }]);

  return Component;
}();

exports.default = Component;


Component.defaultProps = {};

},{"./utilities/findRefs":6,"./utilities/merge":8,"./utilities/parseAttributeProps":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.findByName = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _differentiate = require('./utilities/differentiate');

var _differentiate2 = _interopRequireDefault(_differentiate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {};

var register = function register(components) {
  var difference = (0, _differentiate2.default)(_components, components, function (key) {
    throw new Error(key + ' component already registered');
  });

  _components = _extends({}, _components, difference);
};

var findByName = function findByName(name) {
  var components = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _components;

  return components[name];
};

exports.findByName = findByName;
exports.register = register;

},{"./utilities/differentiate":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _componentRegistry = require('./componentRegistry');

var _instantiateComponent = require('./utilities/instantiateComponent');

var _instantiateComponent2 = _interopRequireDefault(_instantiateComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mount = function mount(element, parent) {
  return (0, _instantiateComponent2.default)(element, parent);
};

exports.default = {
  Component: _Component2.default,
  mount: mount,
  register: _componentRegistry.register
};

},{"./Component":1,"./componentRegistry":2,"./utilities/instantiateComponent":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differentiate;
function differentiate(target, source) {
  var onMatchFound = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  var difference = {};

  Object.keys(source).forEach(function (key) {
    if (target[key]) {
      onMatchFound(key);
    }

    difference[key] = source[key];
  });

  return difference;
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findImmediateChildren;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function findImmediateChildren(el, selector) {
  var immediateChildren = [];
  var children = [].concat(_toConsumableArray(el.querySelectorAll(selector)));

  children.reverse().forEach(function (a) {
    var count = 0;
    children.forEach(function (b) {
      if (b.contains(a)) {
        count++;
      }
    });

    if (count === 1) {
      immediateChildren.push(a);
    }
  });

  return immediateChildren.reverse();
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findRefs;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function findRefs(element, children) {
  var refs = {};

  [].concat(_toConsumableArray(element.querySelectorAll('[data-ref]'))).filter(function (element) {
    return children.filter(function (child) {
      return child.element.contains(element);
    }).length === 0;
  }).forEach(function (element) {
    refs[element.dataset.ref] = element;
  });

  return refs;
};

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = instantiateComponent;

var _componentRegistry = require('./../componentRegistry');

var _findImmediateChildren = require('./findImmediateChildren');

var _findImmediateChildren2 = _interopRequireDefault(_findImmediateChildren);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var count = 0;

function instantiateComponent(el, parent) {
  var element = el;
  var componentName = element.dataset.component;
  var Component = (0, _componentRegistry.findByName)(componentName);
  var componentID = 'component_' + count++;
  element.dataset.componentId = componentID;

  if (typeof Component !== 'function') {
    throw new Error(componentName + ' is not a registered component');
  }

  var instance = new Component(element, parent);
  var childComponentElements = (0, _findImmediateChildren2.default)(element, '[data-component]');
  var children = childComponentElements.map(function (el) {
    return instantiateComponent(el, instance);
  });
  instance._id = componentID;
  instance.children = children;
  instance._init();

  if (parent) {
    parent.children.push(instance);
  }

  return instance;
};

},{"./../componentRegistry":2,"./findImmediateChildren":5}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function merge() {
  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  return Object.assign.apply(Object, [{}].concat(sources));
};

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseAttributeProps;
var memo = {};

function parseAttributeProps(body) {
  if (body && !memo[body]) {
    // eslint-disable-next-line no-new-func
    memo[body] = new Function('parent', '\'use strict\'; return ' + body);
  }

  try {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return memo[body].apply(memo, args);
  } catch (e) {}
};

},{}]},{},[3]);
