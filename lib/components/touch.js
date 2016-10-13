"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Libraries
var React = require("react");
var _ = require("lodash/core");
_.mapValues = require("lodash/mapValues");
_.get = require("lodash/get");
_.take = require("lodash/take");
// Morse Libraies
var ViewportDetect = require("viewport-detection-es6");

var mixins = require("morse-react-mixins");
var _ref = [mixins.css_mixins, mixins.text_mixins, mixins.widths_mixins];
var cssMixins = _ref[0];
var textMixins = _ref[1];
var widthsMixins = _ref[2];

//Flux

var NavActions = require("../actions/nav_actions"),
    NavStore = require("../stores/nav_store");

//Utils
var touch = require("../utils/touch_processing");

// Components
var NavItem = require("./touch-nav-item");

var Touch = function (_React$Component) {
  _inherits(Touch, _React$Component);

  function Touch(props) {
    _classCallCheck(this, Touch);

    var _this = _possibleConstructorReturn(this, (Touch.__proto__ || Object.getPrototypeOf(Touch)).call(this, props));

    var id = _.uniqueId("nav");
    _this.directions;
    NavActions.addingItems(_this.props.navitems, id);
    _this.left = ["nav-mover", "move-left", { hidden: false }];
    _this.right = ["nav-mover", "move-right", { hidden: false }];
    _this.pos = 0;
    _this.state = { listWidth: 1000, listPos: 0, id: id, navitems: NavStore.getNavItems(id), left: _this.getClasses(_this.left), right: _this.getClasses(_this.right), showBtn: true, holder_ref: id + "holder" };
    return _this;
  }

  _createClass(Touch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.detect = new ViewportDetect();
      var device = this.detect.getDevice();

      this.vp_id = this.detect.trackSize(this._onViewChange.bind(this));

      var width = this._getWidths();
      this.setState({ listWidth: width });
      // console.log(this.detect.removeCallback(this.vp_id));
      NavStore.addChangeListener("change", this._onChange.bind(this));
      // NavStore.addChangeListener("adding", this._onAdd.bind(this));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var width = this._getWidths();
      if (width !== this.state.listWidth) {
        this.setState({ listWidth: width });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // console.log("new props", nextProps.navitems)
      // console.log(this.props.navitems !== nextProps.navitems)
      if (this.props.navitems !== nextProps.navitems) {
        NavActions.updateItems(nextProps.navitems, this.state.id);
        this.pos = 0;
        this.setState({ navitems: NavStore.getNavItems(this.state.id), listPos: 0 });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.detect.removeCallback(this.vp_id);
      NavStore.removeChangeListener("change", this._onChange);
      // NavStore.removeChangeListener("add", this._onAdd);
    }
  }, {
    key: "_onViewChange",
    value: function _onViewChange() {
      this._showButtons(this.state.listWidth);
      this.setState({ listPos: 0 });
    }

    // _onAdd(){
    //   this.setState({navitems:NavStore.getNavItems(this.state.id)});
    // }

  }, {
    key: "_onChange",
    value: function _onChange() {
      var id = this.state.id;
      this.setState({ navitems: NavStore.getNavItems(id) });
    }
  }, {
    key: "_getDistance",
    value: function _getDistance(move) {
      if (_.isEmpty(move)) return 0;

      return _.reduce(move, function (prev, cur) {
        return prev + cur;
      });
    }
  }, {
    key: "_showButtons",
    value: function _showButtons(width) {
      var holder = this._getHolderWidth();
      var show = width > holder;

      if (show !== this.state.showBtn) {
        this.left = this.setValue(this.left, "hidden", !show);
        this.right = this.setValue(this.right, "hidden", !show);

        this.setState({ left: this.getClasses(this.left), right: this.getClasses(this.right), showBtn: show });
      }
    }
  }, {
    key: "_getHolderWidth",
    value: function _getHolderWidth() {
      return _.get(this.refs, this.state.holder_ref).offsetWidth;
    }
  }, {
    key: "_getWidths",
    value: function _getWidths() {
      // return 0;
      // this.convertReactComps(_.omit(this.refs, this.state.holder_ref));
      if (this.refs.navlist) {
        this.convertDomlist(this.refs.navlist.querySelectorAll("li"));
        var width = Math.ceil(this.getWidths());
        this._showButtons(width);
        return width;
      }

      return this.state.listWidth;
    }
  }, {
    key: "_setStyle",
    value: function _setStyle() {
      var styles = { "width": this.state.listWidth, left: this.state.listPos };
      return _.mapValues(styles, function (v) {
        return v.toString() + "px";
      });
    }
  }, {
    key: "_buttonMove",
    value: function _buttonMove(dir, e) {
      e.preventDefault();
      this._mover(dir);
    }
  }, {
    key: "_mover",
    value: function _mover(dir) {

      var elms = this.getAllWidths();
      if (dir === "left" && this.pos > 0) {
        this.pos--;
      } else if (dir === "right" && this.pos < elms.length) {
        this.pos++;
      }

      var move = _.map(_.take(elms, this.pos), "width");
      var mover = -this._getDistance(move);
      var holder = this._getHolderWidth();
      if (this.state.listWidth + mover < holder) {
        mover = -(this.state.listWidth - holder);
      }

      this.setState({ listPos: mover });
    }
  }, {
    key: "_renderNav",
    value: function _renderNav() {
      var _this2 = this;

      var navitems = void 0;
      if (_.isArray(this.state.navitems)) {
        navitems = _.map(this.state.navitems, function (ni, i) {
          var key = _this2.createId(ni.name, i, "touchnav");

          return React.createElement(NavItem, {
            key: key,
            nav_id: _this2.state.id,
            callback: _this2.props.callback,
            nav_item: ni
          });
        });
      } else {
        navitems = "";
      }

      return _.isEmpty(navitems) ? "" : navitems;
    }
  }, {
    key: "_touchCancel",
    value: function _touchCancel(e) {
      // console.log("cancel", _.first(e.touches))
    }
  }, {
    key: "_touchEnd",
    value: function _touchEnd(e) {
      var dir = this.directions.getDirection();
      // console.log("end", dir)
      if (dir.moveX !== "") {
        this._mover(dir.moveX);
      }
    }
  }, {
    key: "_touchMove",
    value: function _touchMove(e) {
      this.directions.addMove(e.touches);
      // console.log("move", _.first(e.touches))
    }
  }, {
    key: "_touchStart",
    value: function _touchStart(e) {
      this.directions = touch(e.touches);
      // console.log("start", _.first(e.touches))
    }
  }, {
    key: "_setCss",
    value: function _setCss(type) {
      var t = void 0;
      switch (type) {
        case "main":
          t = _.has(this.props, "main_css") ? this.props.main_css : "touch-nav";
          break;
        case "ul":
          t = _.has(this.props, "ul_css") ? this.props.ul_css : "nav-items";
          break;
      }

      return t;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "nav",
        { className: this._setCss("main"),
          onTouchCancel: this._touchCancel.bind(this),
          onTouchEnd: this._touchEnd.bind(this),
          onTouchMove: this._touchMove.bind(this),
          onTouchStart: this._touchStart.bind(this)
        },
        React.createElement(
          "a",
          { href: "#", className: this.state.left, onClick: this._buttonMove.bind(this, "left") },
          React.createElement(
            "span",
            { className: "hidden" },
            "left"
          )
        ),
        React.createElement(
          "div",
          { className: "list-holder", ref: this.state.holder_ref },
          React.createElement(
            "ul",
            { className: this._setCss("ul"), style: this._setStyle(), onLoad: this._getWidths.bind(this), ref: "navlist" },
            this._renderNav()
          )
        ),
        React.createElement(
          "a",
          { href: "#", className: this.state.right, onClick: this._buttonMove.bind(this, "right") },
          React.createElement(
            "span",
            { className: "hidden" },
            "right"
          )
        )
      );
    }
  }]);

  return Touch;
}(React.Component);

Object.assign(Touch.prototype, cssMixins);
Object.assign(Touch.prototype, textMixins);
Object.assign(Touch.prototype, widthsMixins);

module.exports = Touch;
//# sourceMappingURL=touch.js.map