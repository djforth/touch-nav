const NavStore = require('../../src/stores/nav_store');

const storeHelper    = require("react-jasmine").storeHelpers;
const defaultsHelper = require("react-jasmine").checkDefaults;

const _         = require('lodash');
// const Immutable = require('immutable');


describe('NavStore', function() {
  let options = [
    {
      func:"addNavItems"
      , action:{
        type:"ADDING_NAV"
        , nav:["foo"]
        , id:1
      }
      , args:[["foo"], 1]
      , change:"adding"
    }
    , {
      func:"changeActive"
      , action:{
        type   : "CHANGE_ACTIVE"
        , nav_id : "nav1"
        , id     : 1
      }
      , args:[1, "nav1"]
      , change:"change"
    }
  ];

  storeHelper.checkDispatcher(NavStore, "registeredCallback", options)

  storeHelper.checkChangeEvents(()=>{
    return NavStore.__get__("store");
  });

  describe('store function', function() {
    let store, nav_items;
    beforeEach(function() {
      store     = NavStore.__get__("store");
      nav_items = NavStore.__get__("nav_items");
    });
  });
});