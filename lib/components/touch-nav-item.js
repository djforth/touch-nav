(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/has', 'lodash/values', 'lodash/isFunction', 'lodash/omit', 'react', 'morse-react-mixins', '../actions/nav_actions', '../stores/nav_store'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/has'), require('lodash/values'), require('lodash/isFunction'), require('lodash/omit'), require('react'), require('morse-react-mixins'), require('../actions/nav_actions'), require('../stores/nav_store'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.has, global.values, global.isFunction, global.omit, global.react, global.morseReactMixins, global.nav_actions, global.nav_store);
    global.touchNavItem = mod.exports;
  }
})(this, function (module, exports, _has2, _values2, _isFunction2, _omit2, _react, _morseReactMixins, _nav_actions, _nav_store) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _has3 = _interopRequireDefault(_has2);

  var _values3 = _interopRequireDefault(_values2);

  var _isFunction3 = _interopRequireDefault(_isFunction2);

  var _omit3 = _interopRequireDefault(_omit2);

  var _react2 = _interopRequireDefault(_react);

  var _nav_actions2 = _interopRequireDefault(_nav_actions);

  var _nav_store2 = _interopRequireDefault(_nav_store);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var TouchNavItem = function (_React$Component) {
    _inherits(TouchNavItem, _React$Component);

    function TouchNavItem(props) {
      _classCallCheck(this, TouchNavItem);

      var _this = _possibleConstructorReturn(this, (TouchNavItem.__proto__ || Object.getPrototypeOf(TouchNavItem)).call(this, props));

      // console.log('props', this.props.nav_item);
      _this.listCss = ['date-nav-item', { 'active': _this.props.nav_item.active }];
      _this.state = { list: _this.getClasses(_this.listCss) };
      return _this;
    }

    _createClass(TouchNavItem, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return nextProps.nav_item.active !== this.props.nav_item.active || nextState.list !== this.state.list;
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.listCss = ['date-nav-item', { 'active': nextProps.nav_item.active }];
        this.setState({ list: this.getClasses(this.listCss) });
      }
    }, {
      key: '_clicked',
      value: function _clicked(e) {
        e.preventDefault();

        var item = this.props.nav_item;
        var cb = this.props.callback;
        var data = (0, _omit3.default)(item, 'title');
        if (_morseReactMixins.checker.isMounted(this)) {
          _nav_actions2.default.changeActive(this.props.nav_item.id, this.props.nav_id);
          if ((0, _isFunction3.default)(cb)) {
            cb.apply(this, (0, _values3.default)(data));
          }
        }
      }
    }, {
      key: '_internal',
      value: function _internal(navitem) {
        return _react2.default.createElement(
          'a',
          { href: '#',
            title: navitem.title,
            onClick: this._clicked.bind(this),
            className: 'date-nav-item-link' },
          navitem.name
        );
      }
    }, {
      key: '_external',
      value: function _external(navitem) {
        return _react2.default.createElement(
          'a',
          { href: navitem.href,
            title: navitem.title,
            className: 'date-nav-item-link' },
          navitem.name
        );
      }
    }, {
      key: '_renderLink',
      value: function _renderLink(navitem) {
        return (0, _has3.default)(navitem, 'href') ? this._external(navitem) : this._internal(navitem);
      }
    }, {
      key: 'render',
      value: function render() {
        var navitem = this.props.nav_item;
        return _react2.default.createElement(
          'li',
          { role: 'presentation', className: this.state.list },
          this._renderLink(navitem)
        );
      }
    }]);

    return TouchNavItem;
  }(_react2.default.Component);

  Object.assign(TouchNavItem.prototype, _morseReactMixins.css_mixins);
  Object.assign(TouchNavItem.prototype, _morseReactMixins.text_mixins);
  // Object.assign(TouchNavItem.prototype, checker);


  exports.default = TouchNavItem;
  module.exports = exports['default'];
});