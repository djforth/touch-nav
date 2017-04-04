import {Dispatcher} from 'flux';


const NavDispatcher = Object.assign(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action"s
   * type and additional data coming from the server.
   */
  addingNavItems: function(action){
    let payload = {
      source: 'ADDING_NAV'
      , action: action
    };
    this.dispatch(payload);
  }

  , changeActive: function(action){
    let payload = {
      source: 'CHANGE_ACTIVE'
      , action: action
    };
    this.dispatch(payload);
  }

  , updateNavItems: function(action){
    let payload = {
      source: 'UPDATE_NAV'
      , action: action
    };
    this.dispatch(payload);
  }
});

export default NavDispatcher;
