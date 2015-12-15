const EventEmitter  = require("events").EventEmitter
    , assign        = require("react/lib/Object.assign");

const _ = require("lodash");

const NavDispatcher = require("../dispatchers/nav_dispatcher");


let nav_items = [];

const store = {
  emitChange(event) {
    this.emit(event);
  },

  addChangeListener(event, callback) {
    this.on(event, callback);
  },

  removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  },

  addNavItems(items, id){
    id = (id) ? id : _.uniqueId("nav");
    nav_items.push({items:this.setItems(items), id:id});
  },

  changeActive(id, nav_id){
    let items = this.getNavItems(nav_id);
    items = _.map(items, (item)=>{
      item.active = (item.id === id);
      return item;
    });
  },

  getNavItems(id){
    if(id){
      let ni = _.find(nav_items, (ni)=>ni.id === id)
      if(ni) return ni.items
    }

    return _.first(nav_items).items
  },

  setNavItems(id, items){
    nav_items = _.map(nav_items, (ni)=>{
      if(ni.id === id){
        ni.items = items;
      }
      return ni;
    })
  },

  setItems(items){
    return _.map(items, (item)=>{
      if(!_.has(item, "active")) item.active = false;
      if(!_.has(item, "id")) item.id = _.uniqueId();
      return item;
    })
  }
}


const NavStore = assign({}, EventEmitter.prototype, store);

const registeredCallback = function(payload) {
  let action = payload.action;
  switch(action.type) {
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