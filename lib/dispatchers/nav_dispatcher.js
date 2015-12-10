"use strict";

var Dispatcher = require("flux").Dispatcher;
var assign = require("react/lib/Object.assign");

var NavDispatcher = assign(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action"s
   * type and additional data coming from the server.
   */
  addingNavItems: function addingNavItems(action) {
    var payload = {
      source: "ADDING_NAV",
      action: action
    };
    this.dispatch(payload);
  },

  changeActive: function changeActive(action) {
    var payload = {
      source: "CHANGE_ACTIVE",
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = NavDispatcher;
//# sourceMappingURL=nav_dispatcher.js.map