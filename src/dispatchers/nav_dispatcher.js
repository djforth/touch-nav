const Dispatcher = require("flux").Dispatcher;
const assign     = require("react/lib/Object.assign");

const NavDispatcher = assign(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action"s
   * type and additional data coming from the server.
   */
  addingNavItems: function(action) {
    var payload = {
      source: "ADDING_NAV",
      action: action
    };
    this.dispatch(payload);
  }

  , changeActive: function(action) {
    var payload = {
      source: "CHANGE_ACTIVE",
      action: action
    };
    this.dispatch(payload);
  }

  , updateNavItems: function(action) {
    var payload = {
      source: "UPDATE_NAV",
      action: action
    };
    this.dispatch(payload);
  }
});


module.exports = NavDispatcher;