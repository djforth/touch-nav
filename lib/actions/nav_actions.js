(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '../dispatchers/nav_dispatcher'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../dispatchers/nav_dispatcher'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.nav_dispatcher);
    global.nav_actions = mod.exports;
  }
})(this, function (module, exports, _nav_dispatcher) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _nav_dispatcher2 = _interopRequireDefault(_nav_dispatcher);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    addingItems: function addingItems(items, id) {
      _nav_dispatcher2.default.addingNavItems({
        type: 'ADDING_NAV',
        nav: items,
        id: id
      });
    },

    changeActive: function changeActive(id, nav_id) {
      _nav_dispatcher2.default.changeActive({
        type: 'CHANGE_ACTIVE',
        nav_id: nav_id,
        id: id
      });
    },

    updateItems: function updateItems(items, id) {
      _nav_dispatcher2.default.updateNavItems({
        type: 'UPDATE_NAV',
        nav: items,
        id: id
      });
    }
  };
  module.exports = exports['default'];
});