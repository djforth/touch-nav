"use strict";

var EventEmitter = require("events").EventEmitter,
    assign = require("react/lib/Object.assign");

var _ = require("lodash");

var NavDispatcher = require("../dispatchers/nav_dispatcher");

var nav_items = [];

var store = {
  emitChange: function emitChange(event) {
    this.emit(event);
  },
  addChangeListener: function addChangeListener(event, callback) {
    this.on(event, callback);
  },
  removeChangeListener: function removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  },
  addNavItems: function addNavItems(items, id) {
    id = id ? id : _.uniqueId("nav");
    nav_items.push({ items: this.setItems(items), id: id });
  },
  changeActive: function changeActive(id, nav_id) {
    var items = this.getNavItems(nav_id);
    items = _.map(items, function (item) {
      item.active = item.id === id;
      return item;
    });
  },
  getNavItems: function getNavItems(id) {
    console.log("nav_items", nav_items);
    if (id) {
      var ni = _.find(nav_items, function (ni) {
        return ni.id === id;
      });
      if (ni) return ni.items;
    }

    return _.first(nav_items).items;
  },
  setNavItems: function setNavItems(id, items) {
    nav_items = _.map(nav_items, function (ni) {
      if (ni.id === id) {
        ni.items = items;
      }
      return ni;
    });
  },
  setItems: function setItems(items) {
    return _.map(items, function (item) {
      if (!_.has(item, "active")) item.active = false;
      if (!_.has(item, "id")) item.id = _.uniqueId();
      return item;
    });
  }
};

var NavStore = assign({}, EventEmitter.prototype, store);

var registeredCallback = function registeredCallback(payload) {
  var action = payload.action;
  switch (action.type) {
    case "ADDING_NAV":
      NavStore.addNavItems(action.nav, action.id);
      NavStore.emitChange("adding");
      break;

    case "CHANGE_ACTIVE":
      NavStore.changeActive(action.id, action.nav_id);
      NavStore.emitChange("change");
      break;
  }
};

NavStore.dispatchToken = NavDispatcher.register(registeredCallback);
NavStore.setMaxListeners(0);

module.exports = NavStore;
//# sourceMappingURL=nav_store.js.map