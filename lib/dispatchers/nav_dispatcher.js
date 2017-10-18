(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'flux'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('flux'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.flux);
    global.nav_dispatcher = mod.exports;
  }
})(this, function (module, exports, _flux) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var NavDispatcher = Object.assign(new _flux.Dispatcher(), {

    /**
     * @param {object} action The details of the action, including the action"s
     * type and additional data coming from the server.
     */
    addingNavItems: function addingNavItems(action) {
      var payload = {
        source: 'ADDING_NAV',
        action: action
      };
      this.dispatch(payload);
    },

    changeActive: function changeActive(action) {
      var payload = {
        source: 'CHANGE_ACTIVE',
        action: action
      };
      this.dispatch(payload);
    },

    updateNavItems: function updateNavItems(action) {
      var payload = {
        source: 'UPDATE_NAV',
        action: action
      };
      this.dispatch(payload);
    }
  });

  exports.default = NavDispatcher;
  module.exports = exports['default'];
});