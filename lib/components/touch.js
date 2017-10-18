(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/isArray', 'lodash/map', 'lodash/reduce', 'lodash/isEmpty', 'lodash/uniqueId', 'react', '@djforth/viewport-detection-fp', 'morse-react-mixins', '../actions/nav_actions', '../stores/nav_store', '../utils/touch_processing', './touch-nav-item', './presentational/left_arrow'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/isArray'), require('lodash/map'), require('lodash/reduce'), require('lodash/isEmpty'), require('lodash/uniqueId'), require('react'), require('@djforth/viewport-detection-fp'), require('morse-react-mixins'), require('../actions/nav_actions'), require('../stores/nav_store'), require('../utils/touch_processing'), require('./touch-nav-item'), require('./presentational/left_arrow'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.isArray, global.map, global.reduce, global.isEmpty, global.uniqueId, global.react, global.viewportDetectionFp, global.morseReactMixins, global.nav_actions, global.nav_store, global.touch_processing, global.touchNavItem, global.left_arrow);
    global.touch = mod.exports;
  }
})(this, function (module, exports, _isArray2, _map2, _reduce2, _isEmpty2, _uniqueId2, _react, _viewportDetectionFp, _morseReactMixins, _nav_actions, _nav_store, _touch_processing, _touchNavItem, _left_arrow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isArray3 = _interopRequireDefault(_isArray2);

  var _map3 = _interopRequireDefault(_map2);

  var _reduce3 = _interopRequireDefault(_reduce2);

  var _isEmpty3 = _interopRequireDefault(_isEmpty2);

  var _uniqueId3 = _interopRequireDefault(_uniqueId2);

  var _react2 = _interopRequireDefault(_react);

  var _viewportDetectionFp2 = _interopRequireDefault(_viewportDetectionFp);

  var _nav_actions2 = _interopRequireDefault(_nav_actions);

  var _nav_store2 = _interopRequireDefault(_nav_store);

  var _touch_processing2 = _interopRequireDefault(_touch_processing);

  var _touchNavItem2 = _interopRequireDefault(_touchNavItem);

  var _left_arrow2 = _interopRequireDefault(_left_arrow);

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

  var Touch = function (_React$Component) {
    _inherits(Touch, _React$Component);

    function Touch(props) {
      _classCallCheck(this, Touch);

      var _this = _possibleConstructorReturn(this, (Touch.__proto__ || Object.getPrototypeOf(Touch)).call(this, props));

      var id = (0, _uniqueId3.default)('nav');
      _this.directions;
      _this.holder_ref;
      _this.navlist;
      _nav_actions2.default.addingItems(_this.props.navitems, id);
      _this.left = ['nav-mover', 'move-left', { hidden: false }];
      _this.right = ['nav-mover', 'move-right', { hidden: false }];
      _this.buttonMoveLeft = _this._buttonMove.bind(_this, 'left');
      _this.buttonMoveRight = _this._buttonMove.bind(_this, 'right');
      _this.pos = 0;
      _this.state = { listWidth: 1000, listPos: 0, id: id, navitems: _nav_store2.default.getNavItems(id), left: _this.getClasses(_this.left), right: _this.getClasses(_this.right), showBtn: true };
      return _this;
    }

    _createClass(Touch, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        this.vpDetect = (0, _viewportDetectionFp2.default)();
        this.vpDetect.addCallback(function (device) {
          _this2.setState({ device: device });
        });
        this.vpDetect.track();
        // this.detect = new ViewportDetect();
        this.device = this.vpDetect.getDevice();

        var width = this._getWidths();
        this.setState({ listWidth: width });
        // console.log(this.detect.removeCallback(this.vp_id));
        _nav_store2.default.addChangeListener('change', this._onChange.bind(this));
        // NavStore.addChangeListener("adding", this._onAdd.bind(this));
      }
    }, {
      key: 'componentDidCatch',
      value: function componentDidCatch(error, info) {
        // Display fallback UI
        // You can also log the error to an error reporting service
        logErrorToMyService(error, info);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var width = this._getWidths();
        if (width !== this.state.listWidth) {
          this.setState({ listWidth: width });
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.props.navitems !== nextProps.navitems) {
          _nav_actions2.default.updateItems(nextProps.navitems, this.state.id);
          this.pos = 0;
          this.setState({ navitems: _nav_store2.default.getNavItems(this.state.id), listPos: 0 });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _nav_store2.default.removeChangeListener('change', this._onChange);
      }
    }, {
      key: '_onViewChange',
      value: function _onViewChange() {
        this._showButtons(this.state.listWidth);
        this.setState({ listPos: 0 });
      }
    }, {
      key: '_onChange',
      value: function _onChange() {
        var id = this.state.id;
        this.setState({ navitems: _nav_store2.default.getNavItems(id) });
      }
    }, {
      key: '_getDistance',
      value: function _getDistance(move) {
        if ((0, _isEmpty3.default)(move)) return 0;

        return (0, _reduce3.default)(move, function (prev, cur) {
          return prev + cur;
        });
      }
    }, {
      key: '_showButtons',
      value: function _showButtons(width) {
        var holder = this._getHolderWidth();
        var show = width > holder;

        if (show !== this.state.showBtn) {
          this.left = this.setValue(this.left, 'hidden', !show);
          this.right = this.setValue(this.right, 'hidden', !show);

          this.setState({ left: this.getClasses(this.left), right: this.getClasses(this.right), showBtn: show });
        }
      }
    }, {
      key: '_getHolderWidth',
      value: function _getHolderWidth() {
        return this.holder_ref.offsetWidth;
      }
    }, {
      key: '_getWidths',
      value: function _getWidths() {
        if (this.navlist) {
          this.convertDomlist(this.navlist.querySelectorAll('li'));
          var width = Math.ceil(this.getWidths());
          this._showButtons(width);
          return width;
        }

        return this.state.listWidth;
      }
    }, {
      key: '_setStyle',
      value: function _setStyle() {
        var styles = { 'width': this.state.listWidth, 'left': this.state.listPos };
        return Object.values(styles).map(function (v) {
          return v.toString() + 'px';
        });
      }
    }, {
      key: '_buttonMove',
      value: function _buttonMove(dir, e) {
        e.preventDefault();
        this._mover(dir);
      }
    }, {
      key: '_mover',
      value: function _mover(dir) {
        var elms = this.getAllWidths();
        if (dir === 'left' && this.pos > 0) {
          this.pos--;
        } else if (dir === 'right' && this.pos < elms.length) {
          this.pos++;
        }

        var move = (0, _map3.default)(elms.slice(0, this.pos), 'width');
        var mover = -this._getDistance(move);
        var holder = this._getHolderWidth();
        if (this.state.listWidth + mover < holder) {
          mover = -(this.state.listWidth - holder);
        }

        this.setState({ listPos: mover });
      }
    }, {
      key: '_renderNav',
      value: function _renderNav() {
        var _this3 = this;

        var navitems = void 0;
        if ((0, _isArray3.default)(this.state.navitems)) {
          navitems = (0, _map3.default)(this.state.navitems, function (ni, i) {
            var key = _this3.createId(ni.name, i, 'touchnav');

            return _react2.default.createElement(_touchNavItem2.default, {
              key: key,
              nav_id: _this3.state.id,
              callback: _this3.props.callback,
              nav_item: ni
            });
          });
        } else {
          navitems = '';
        }

        return (0, _isEmpty3.default)(navitems) ? '' : navitems;
      }
    }, {
      key: '_touchCancel',
      value: function _touchCancel(e) {
        // console.log("cancel", _.first(e.touches))
      }
    }, {
      key: '_touchEnd',
      value: function _touchEnd(e) {
        var dir = this.directions.getDirection();
        // console.log("end", dir)
        if (dir.moveX !== '') {
          this._mover(dir.moveX);
        }
      }
    }, {
      key: '_touchMove',
      value: function _touchMove(e) {
        this.directions.addMove(e.touches);
        // console.log("move", _.first(e.touches))
      }
    }, {
      key: '_touchStart',
      value: function _touchStart(e) {
        this.directions = (0, _touch_processing2.default)(e.touches);
        // console.log("start", _.first(e.touches))
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

        return _react2.default.createElement(
          'nav',
          { className: 'touch-nav',
            onTouchCancel: this._touchCancel.bind(this),
            onTouchEnd: this._touchEnd.bind(this),
            onTouchMove: this._touchMove.bind(this),
            onTouchStart: this._touchStart.bind(this)
          },
          _react2.default.createElement(
            'a',
            { href: '#', className: this.state.left, onClick: this.buttonMoveLeft },
            _react2.default.createElement(
              'span',
              { className: 'hidden' },
              'right'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'list-holder', ref: function ref(e) {
                _this4.holder_ref = e;
              } },
            _react2.default.createElement(
              'ul',
              { className: 'nav-items', style: this._setStyle(), onLoad: this._getWidths.bind(this), ref: function ref(e) {
                  _this4.navlist = e;
                } },
              this._renderNav()
            )
          ),
          _react2.default.createElement(
            'a',
            { href: '#', className: this.state.right, onClick: this.buttonMoveRight },
            _react2.default.createElement(
              'span',
              { className: 'hidden' },
              'right'
            )
          )
        );
      }
    }]);

    return Touch;
  }(_react2.default.Component);

  Object.assign(Touch.prototype, _morseReactMixins.css_mixins);
  Object.assign(Touch.prototype, _morseReactMixins.text_mixins);
  Object.assign(Touch.prototype, _morseReactMixins.widths_mixins);

  exports.default = Touch;
  module.exports = exports['default'];
});