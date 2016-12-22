(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.unframework = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _components = {};

var register = function register(components) {
  _components = _extends({}, _components, components);
};

var findByName = function findByName(name) {
  var components = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _components;

  return components[name];
};

exports.findByName = findByName;
exports.register = register;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _componentRegistry = require('./componentRegistry');

// import instantiateComponent from './utilities/instantiateComponent';
//
// const mount = (element, parent) => instantiateComponent(element, parent);
//
// register({ IfComponent });

exports.default = {
  register: _componentRegistry.register
}; // import Component from './Component';
// import IfComponent from './components/IfComponent';

},{"./componentRegistry":1}]},{},[2])(2)
});
