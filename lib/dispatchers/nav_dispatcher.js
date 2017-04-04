import { Dispatcher } from 'flux';

var NavDispatcher = Object.assign(new Dispatcher(), {

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

export default NavDispatcher;
//# sourceMappingURL=nav_dispatcher.js.map