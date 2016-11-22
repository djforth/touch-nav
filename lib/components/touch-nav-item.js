"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react"),
    _ = require("lodash/core");

_.omit = require("lodash/omit");
//Mixins
var mixins = require("morse-react-mixins");
var _ref = [mixins.css_mixins, mixins.text_mixins, mixins.checker],
    cssMixins = _ref[0],
    textMixins = _ref[1],
    checker = _ref[2];

//Flux

var NavActions = require("../actions/nav_actions"),
    NavStore = require("../stores/nav_store");

var TouchNavItem = function (_React$Component) {
  _inherits(TouchNavItem, _React$Component);

  function TouchNavItem(props) {
    _classCallCheck(this, TouchNavItem);

    // console.log('props', this.props.nav_item);
    var _this = _possibleConstructorReturn(this, (TouchNavItem.__proto__ || Object.getPrototypeOf(TouchNavItem)).call(this, props));

    _this.listCss = ["date-nav-item", { "active": _this.props.nav_item.active }];
    _this.state = { list: _this.getClasses(_this.listCss) };
    return _this;
  }

  _createClass(TouchNavItem, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.nav_item.active !== this.props.nav_item.active || nextState.list !== this.state.list;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.listCss = ["date-nav-item", { "active": nextProps.nav_item.active }];
      this.setState({ list: this.getClasses(this.listCss) });
    }
  }, {
    key: "_clicked",
    value: function _clicked(e) {
      e.preventDefault();

      var item = this.props.nav_item;
      var cb = this.props.callback;
      var data = _.omit(item, 'title');
      if (checker.isMounted(this)) {
        NavActions.changeActive(this.props.nav_item.id, this.props.nav_id);
        if (_.isFunction(cb)) {
          cb.apply(this, _.values(data));
        }
      }
    }
  }, {
    key: "_internal",
    value: function _internal(navitem) {
      return React.createElement(
        "a",
        { href: "#",
          title: navitem.title,
          onClick: this._clicked.bind(this),
          className: "date-nav-item-link" },
        navitem.name
      );
    }
  }, {
    key: "_external",
    value: function _external(navitem) {
      return React.createElement(
        "a",
        { href: navitem.href,
          title: navitem.title,
          className: "date-nav-item-link" },
        navitem.name
      );
    }
  }, {
    key: "_renderLink",
    value: function _renderLink(navitem) {
      return _.has(navitem, "href") ? this._external(navitem) : this._internal(navitem);
    }
  }, {
    key: "render",
    value: function render() {
      var navitem = this.props.nav_item;
      return React.createElement(
        "li",
        { role: "presentation", className: this.state.list },
        this._renderLink(navitem)
      );
    }
  }]);

  return TouchNavItem;
}(React.Component);

Object.assign(TouchNavItem.prototype, cssMixins);
Object.assign(TouchNavItem.prototype, textMixins);
// Object.assign(TouchNavItem.prototype, checker);


module.exports = TouchNavItem;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(cssMixins, "cssMixins", "src/components/touch-nav-item.js");

  __REACT_HOT_LOADER__.register(textMixins, "textMixins", "src/components/touch-nav-item.js");

  __REACT_HOT_LOADER__.register(checker, "checker", "src/components/touch-nav-item.js");

  __REACT_HOT_LOADER__.register(TouchNavItem, "TouchNavItem", "src/components/touch-nav-item.js");
}();

;