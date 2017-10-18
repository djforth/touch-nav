(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.react);
    global.left_arrow = mod.exports;
  }
})(this, function (module, exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var styles = {
    fill: '#cfcfcf'
  };

  var LeftArrow = function LeftArrow() {
    return _react2.default.createElement(
      'svg',
      { xmlns: 'http://www.w3.org/2000/svg', viewBox: '157.3 491.7 21.7 39' },
      _react2.default.createElement(
        'title',
        null,
        'Move Left'
      ),
      _react2.default.createElement('path', {
        style: styles,
        d: 'M177 530.7l-19.6-19.5 2.1-2.1 19.6 19.5-2.1 2.1z'
      }),
      _react2.default.createElement('path', {
        style: styles,
        d: 'M179 493.8l-19.5 19.6-2.1-2.1 19.5-19.6 2.1 2.1z'
      })
    );
  };

  exports.default = LeftArrow;
  module.exports = exports['default'];
});