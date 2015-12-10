const NavActions = require("../../src/actions/nav_actions");


const actionHelper = require("react-jasmine").checkActions;

describe("NavActions", function() {

  let options = [
    {
      action:"addingItems",
      handler:"addingNavItems",
      args:[["foo"], 1],
      dispactchArgs:{
        type : "ADDING_NAV",
        nav  : ["foo"],
        id   : 1
      }
    },
    {
      action:"changeActive",
      handler:"changeActive",
      args:[1, "nav1"],
      dispactchArgs:{
        type   : "CHANGE_ACTIVE",
        nav_id : "nav1",
        id     : 1
      }
    }
  ];

  actionHelper(NavActions, "NavDispatcher", options);

});