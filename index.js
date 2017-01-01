(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.unframework = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createParser = _dereq_('./createParser');

var _createParser2 = _interopRequireDefault(_createParser);

var _utils = _dereq_('./utils');

var _tree = _dereq_('./tree');

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
  function Component(el) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Component);

    this.el = el;
    this.state = {};
    this.refs = {};
    this.parent = parent;
    this.children = [];
    this._isMounted = false;
    this.props = Object.assign({}, this.constructor.defaultProps);
    this.parse = (0, _createParser2.default)('return ' + this.el.dataset.props, 'parent, loop'.concat(_tree2.default.branchNamesToArgList(this)));
  }

  _createClass(Component, [{
    key: 'acceptState',
    value: function acceptState(nextState) {
      this.state = Object.assign({}, this.state, nextState);
      var nextProps = Object.assign({}, this.props, this.parse.apply(this, [this.parent, this.loop].concat(_toConsumableArray(_tree2.default.branchesToArgs(this)))));

      if (this._isMounted === false) {
        this.props = nextProps;
        this.componentWillMount();
        this.refs = (0, _utils.findRefs)(this.el, this.children);
        this.render(this.props, this.state);
        this._isMounted = true;
        this.componentDidMount();
      } else {
        this.componentWillReceiveProps(nextProps);
        this.props = nextProps;
        if (this.shouldComponentUpdate() === false) {
          return;
        }
        this.componentWillUpdate();
        this.render(this.props, this.state);
        this.componentDidUpdate();
      }

      this.children.forEach(function (child) {
        return child.acceptState();
      });
    }
  }, {
    key: 'setState',
    value: function setState(nextState) {
      this.acceptState(nextState);
    }
  }, {
    key: 'unmount',
    value: function unmount() {
      this._isMounted = false;
      this.componentWillUnmount();
      this.children.forEach(function (child) {
        return child.unmount();
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.children.forEach(function (child) {
        return child.destroy();
      });
    }
  }, {
    key: 'shouldMountChildren',
    value: function shouldMountChildren() {
      return true;
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {}
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
    value: function render() {}
  }]);

  return Component;
}();

Component.defaultProps = {};
exports.default = Component;

},{"./createParser":7,"./tree":11,"./utils":12}],2:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Component2 = _dereq_('./Component');

var _Component3 = _interopRequireDefault(_Component2);

var _EachItemComponent = _dereq_('./EachItemComponent');

var _EachItemComponent2 = _interopRequireDefault(_EachItemComponent);

var _createParser = _dereq_('./createParser');

var _createParser2 = _interopRequireDefault(_createParser);

var _mount = _dereq_('./mount');

var _utils = _dereq_('./utils');

var _tree = _dereq_('./tree');

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var count = 0;

var EachComponent = function (_Component) {
  _inherits(EachComponent, _Component);

  function EachComponent() {
    var _ref;

    _classCallCheck(this, EachComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = EachComponent.__proto__ || Object.getPrototypeOf(EachComponent)).call.apply(_ref, [this].concat(args)));

    _this._id = '' + count++;
    _this.parentNode = _this.el.parentNode;
    _this.nextSiblings = (0, _utils.findNextSiblings)(_this.el, _this.parentNode.children);
    _this.parse = (0, _createParser2.default)('return ' + _this.el.dataset.each, 'parent'.concat(_tree2.default.branchNamesToArgList(_this)));
    return _this;
  }

  _createClass(EachComponent, [{
    key: 'shouldMountChildren',
    value: function shouldMountChildren() {
      return this._isMounted;
    }
  }, {
    key: 'acceptState',
    value: function acceptState(nextState) {
      var items = EachComponent.each(this.parse.apply(this, [this.parent].concat(_toConsumableArray(_tree2.default.branchesToArgs(this)))));

      if (this._isMounted === false) {
        this.parentNode.removeChild(this.el);
        this._isMounted = true;
      }

      this.cleanup();
      this.render(items);
      this.children.forEach(function (child) {
        return child.acceptState();
      });
    }
  }, {
    key: 'cleanup',
    value: function cleanup() {
      var _this2 = this;

      this.children.forEach(function (child) {
        child.unmount();
        // TODO: find out if this is needed
        if (child.cleanup) {
          child.cleanup();
        }
        child.destroy();
      });

      this.children = [];

      [].concat(_toConsumableArray(this.parentNode.querySelectorAll('[data-each-id="' + this._id + '"]'))).forEach(function (child) {
        return _this2.parentNode.removeChild(child);
      });
    }
  }, {
    key: 'render',
    value: function render(items) {
      var _this3 = this;

      var fragment = document.createDocumentFragment();

      items.forEach(function (loop) {
        var clone = _this3.el.cloneNode(true);
        clone.dataset.eachId = _this3._id;
        var eachItem = new _EachItemComponent2.default(clone, _this3);

        (0, _mount.mountChildren)(clone, eachItem, function (child) {
          return Object.assign(child, {
            loop: loop
          });
        });

        _this3.children.push(eachItem);
        fragment.appendChild(clone);
      });

      this.parentNode.insertBefore(fragment, (0, _utils.findReferenceNode)(this.nextSiblings));
    }
  }, {
    key: 'unmount',
    value: function unmount() {
      // put things back in place so that we can remount
      this.parentNode.insertBefore(this.el, (0, _utils.findReferenceNode)(this.nextSiblings));
      _get(EachComponent.prototype.__proto__ || Object.getPrototypeOf(EachComponent.prototype), 'unmount', this).call(this);
    }
  }], [{
    key: 'each',
    value: function each() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return Object.keys(items).map(function (key) {
        return {
          key: key,
          val: items[key]
        };
      });
    }
  }]);

  return EachComponent;
}(_Component3.default);

exports.default = EachComponent;

},{"./Component":1,"./EachItemComponent":3,"./createParser":7,"./mount":9,"./tree":11,"./utils":12}],3:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Component2 = _dereq_('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EachItemComponent = function (_Component) {
  _inherits(EachItemComponent, _Component);

  function EachItemComponent() {
    _classCallCheck(this, EachItemComponent);

    return _possibleConstructorReturn(this, (EachItemComponent.__proto__ || Object.getPrototypeOf(EachItemComponent)).apply(this, arguments));
  }

  return EachItemComponent;
}(_Component3.default);

exports.default = EachItemComponent;

},{"./Component":1}],4:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Component2 = _dereq_('./Component');

var _Component3 = _interopRequireDefault(_Component2);

var _createParser = _dereq_('./createParser');

var _createParser2 = _interopRequireDefault(_createParser);

var _utils = _dereq_('./utils');

var _tree = _dereq_('./tree');

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IfComponent = function (_Component) {
  _inherits(IfComponent, _Component);

  function IfComponent() {
    var _ref;

    _classCallCheck(this, IfComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = IfComponent.__proto__ || Object.getPrototypeOf(IfComponent)).call.apply(_ref, [this].concat(args)));

    _this._isAttached = null;
    _this.parentNode = _this.el.parentNode;
    _this.nextSiblings = (0, _utils.findNextSiblings)(_this.el, _this.parentNode.children);
    _this.parse = (0, _createParser2.default)('return ' + _this.el.dataset.if, 'parent, loop'.concat(_tree2.default.branchNamesToArgList(_this)));
    return _this;
  }

  _createClass(IfComponent, [{
    key: 'acceptState',
    value: function acceptState(nextState) {
      var shouldAttach = this.parse.apply(this, [this.parent, this.loop].concat(_toConsumableArray(_tree2.default.branchesToArgs(this))));

      if (this._isAttached !== shouldAttach) {
        this.render(shouldAttach);
        this._isAttached = shouldAttach;
      }

      if (!this._isAttached) {
        return;
      }

      this.children.forEach(function (child) {
        return child.acceptState();
      });
    }
  }, {
    key: 'render',
    value: function render(shouldAttach) {
      if (shouldAttach) {
        this.attach();

        return;
      }

      this.detach();
    }
  }, {
    key: 'attach',
    value: function attach() {
      var referenceNode = (0, _utils.findReferenceNode)(this.nextSiblings);
      this.parentNode.insertBefore(this.el, referenceNode);
    }
  }, {
    key: 'detach',
    value: function detach() {
      this.parentNode.removeChild(this.el);
      _get(IfComponent.prototype.__proto__ || Object.getPrototypeOf(IfComponent.prototype), 'unmount', this).call(this);
    }
  }]);

  return IfComponent;
}(_Component3.default);

exports.default = IfComponent;

},{"./Component":1,"./createParser":7,"./tree":11,"./utils":12}],5:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = _dereq_('./Component');

var _Component3 = _interopRequireDefault(_Component2);

var _createParser = _dereq_('./createParser');

var _createParser2 = _interopRequireDefault(_createParser);

var _utils = _dereq_('./utils');

var _tree = _dereq_('./tree');

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OutComponent = function (_Component) {
  _inherits(OutComponent, _Component);

  function OutComponent() {
    var _ref;

    _classCallCheck(this, OutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = OutComponent.__proto__ || Object.getPrototypeOf(OutComponent)).call.apply(_ref, [this].concat(args)));

    _this.parse = (0, _createParser2.default)('return ' + _this.el.dataset.out, 'parent, loop'.concat(_tree2.default.branchNamesToArgList(_this)));
    return _this;
  }

  _createClass(OutComponent, [{
    key: 'acceptState',
    value: function acceptState(nextState) {
      var mods = this.parse.apply(this, [this.parent, this.loop].concat(_toConsumableArray(_tree2.default.branchesToArgs(this))));

      this.render(mods);
      this.children.forEach(function (child) {
        return child.acceptState();
      });
    }
  }, {
    key: 'render',
    value: function render(mods) {
      Object.assign(this.el, mods);
    }
  }]);

  return OutComponent;
}(_Component3.default);

exports.default = OutComponent;

},{"./Component":1,"./createParser":7,"./tree":11,"./utils":12}],6:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  COMPONENT_SELECTOR_LIST: "\n    [data-if],\n    [data-each],\n    [data-out],\n    [data-component]\n  ",
  MESSAGE: {
    DUPLICATE_INSTANCE_NAME: function DUPLICATE_INSTANCE_NAME(name) {
      return "Found multiple parents with same name: " + name + ". Parents much use unique,\n      one-word instance names (e.g., [data-component=\"Constructor as unique_name\"]) consisting\n      of only letters.";
    },
    UNREGISTERED_COMPONENT: function UNREGISTERED_COMPONENT(name) {
      return name + " is not a registered component.";
    }
  }
};

},{}],7:[function(_dereq_,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createParser;
function createParser(body) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  // eslint-disable-next-line no-new-func
  return new (Function.prototype.bind.apply(Function, [null].concat(args, ["\n    try {\n      " + body + ";\n    } catch (e) {\n\n    }"])))();
};

},{}],8:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Component = _dereq_('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _registry = _dereq_('./registry');

var _registry2 = _interopRequireDefault(_registry);

var _mount = _dereq_('./mount');

var _mount2 = _interopRequireDefault(_mount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Component: _Component2.default,
  mount: _mount2.default,
  register: _registry2.default.register
};

},{"./Component":1,"./mount":9,"./registry":10}],9:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mount;
exports.mountChildren = mountChildren;

var _Component = _dereq_('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _IfComponent = _dereq_('./IfComponent');

var _IfComponent2 = _interopRequireDefault(_IfComponent);

var _EachComponent = _dereq_('./EachComponent');

var _EachComponent2 = _interopRequireDefault(_EachComponent);

var _OutComponent = _dereq_('./OutComponent');

var _OutComponent2 = _interopRequireDefault(_OutComponent);

var _registry = _dereq_('./registry');

var _registry2 = _interopRequireDefault(_registry);

var _utils = _dereq_('./utils');

var _tree = _dereq_('./tree');

var _tree2 = _interopRequireDefault(_tree);

var _constants = _dereq_('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mount(el, Constructor, props, initialState) {
  var root = new Constructor(el, null, props);
  root.name = 'root';
  root.props = Object.assign({}, root.props, props);
  mountChildren(el, root);
  root.acceptState(initialState);

  return root;
}

function mountChildren(el, parent) {
  var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (x) {
    return x;
  };

  var elements = (0, _utils.findImmediateChildren)(el, _constants2.default.COMPONENT_SELECTOR_LIST);

  if (parent.shouldMountChildren() === false) {
    return;
  }

  elements.forEach(function (element) {
    return processElement(element, parent, function (child) {
      parent.children.push(cb(child));
    });
  });

  parent.children.forEach(function (child) {
    mountChildren(child.el, child, cb);
  });
}

function processElement(el, parent, cb) {
  var component = processComponentAttribute(el.dataset.component);
  var Constructor = _registry2.default.find(component.constructorName);
  var ifExpr = el.dataset.if;
  var eachExpr = el.dataset.each;
  var outExpr = el.dataset.out;

  if (ifExpr) {
    cb(new _IfComponent2.default(el, parent));
    return;
  }
  if (eachExpr) {
    cb(new _EachComponent2.default(el, parent));
    return;
  }
  if (outExpr) {
    cb(new _OutComponent2.default(el, parent));
    return;
  }
  if (Constructor) {
    var instance = new Constructor(el, parent);
    cb(Object.assign(instance, {
      name: component.instanceName
    }));
    return;
  }
}

function processComponentAttribute() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var matches = name.match(/([A-Za-z]+) as ([A-Za-z]+)/) || [];

  return {
    constructorName: matches[1] || name,
    instanceName: matches[2]
  };
}

},{"./Component":1,"./EachComponent":2,"./IfComponent":4,"./OutComponent":5,"./constants":6,"./registry":10,"./tree":11,"./utils":12}],10:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = _dereq_('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {};

var register = function register(components) {
  _components = Object.assign(_components, components);
};

var find = function find() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var trimmedName = name.trim();
  var component = _components[trimmedName];

  if (trimmedName && !component) {
    // eslint-disable-next-line new-cap
    console.warn(_constants2.default.MESSAGE.UNREGISTERED_COMPONENT(trimmedName));
  }

  return component;
};

exports.default = {
  find: find,
  register: register
};

},{"./constants":6}],11:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = _dereq_('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findChild = function findChild(predicate, root) {
  return predicate(root) ? root : root.children.find(function (child) {
    return predicate(child);
  }) || root.children.find(function (child) {
    return findChild(predicate, child);
  });
};

var recurseParents = function recurseParents(cb, root) {
  var parent = root.parent;
  while (parent) {
    cb(parent);
    parent = parent.parent;
  }
};

var findNamedInstanceParents = function findNamedInstanceParents(instance) {
  var namedParents = [];
  recurseParents(function (parent) {
    var name = parent.name;
    if (!name) {
      return;
    }
    if (containsName(name, namedParents)) {
      // eslint-disable-next-line new-cap
      throw new Error(_constants2.default.MESSAGE.DUPLICATE_INSTANCE_NAME(name));
    }
    namedParents.push(parent);
  }, instance);
  return namedParents;
};

var branchNamesToArgList = function branchNamesToArgList(instance) {
  var names = findNamedInstanceParents(instance).map(function (parent) {
    return parent.name;
  });
  var args = names.join(', ');

  return args ? ', ' + args : '';
};

var branchesToArgs = function branchesToArgs(instance) {
  return findNamedInstanceParents(instance);
};
var findBranchByName = function findBranchByName(name) {
  return findChild(function (child) {
    return child.name === name;
  });
};
var findInstance = function findInstance(instance) {
  return findChild(function (child) {
    return child === instance;
  });
};

function containsName() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var instances = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return instances.filter(function (instance) {
    return instance.name === name;
  }).length > 0;
}

exports.default = {
  findInstance: findInstance,
  findBranchByName: findBranchByName,
  branchesToArgs: branchesToArgs,
  branchNamesToArgList: branchNamesToArgList
};

},{"./constants":6}],12:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findReferenceNode = findReferenceNode;
exports.findNextSiblings = findNextSiblings;
exports.findRefs = findRefs;
exports.findImmediateChildren = findImmediateChildren;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function findReferenceNode() {
  var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var ref = null;

  nodes.some(function (node) {
    var isValid = isValidReferenceNode(node);

    if (isValid) {
      ref = node;
    }

    return isValid;
  });

  return ref;
}

function isValidReferenceNode(node) {
  return node && document.body.contains(node);
}

function findNextSiblings(el, children) {
  var childenArray = [].concat(_toConsumableArray(children));
  return childenArray.slice(childenArray.indexOf(el), childenArray.length);
}

function findRefs(el, children) {
  var refs = {};

  [].concat(_toConsumableArray(el.querySelectorAll('[data-ref]'))).filter(function (el) {
    return children.filter(function (child) {
      return Boolean(child.el.dataset.component);
    }).filter(function (child) {
      return child.el.contains(el);
    }).length === 0;
  }).forEach(function (el) {
    refs[el.dataset.ref] = el;
  });

  return refs;
}

function findImmediateChildren(el, selector) {
  var immediateChildren = [];
  var children = [].concat(_toConsumableArray(el.querySelectorAll(selector)));

  children.reverse().forEach(function (a) {
    if (children.filter(function (b) {
      return b.contains(a);
    }).length === 1) {
      immediateChildren.push(a);
    }
  });

  return immediateChildren.reverse();
}

},{}]},{},[8])(8)
});