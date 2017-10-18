(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/has', 'lodash/first', 'lodash/find', 'lodash/map', 'lodash/uniqueId', 'events', '../dispatchers/nav_dispatcher'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/has'), require('lodash/first'), require('lodash/find'), require('lodash/map'), require('lodash/uniqueId'), require('events'), require('../dispatchers/nav_dispatcher'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.has, global.first, global.find, global.map, global.uniqueId, global.events, global.nav_dispatcher);
    global.nav_store = mod.exports;
  }
})(this, function (module, exports, _has2, _first2, _find2, _map2, _uniqueId2, _events, _nav_dispatcher) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _has3 = _interopRequireDefault(_has2);

  var _first3 = _interopRequireDefault(_first2);

  var _find3 = _interopRequireDefault(_find2);

  var _map3 = _interopRequireDefault(_map2);

  var _uniqueId3 = _interopRequireDefault(_uniqueId2);

  var _nav_dispatcher2 = _interopRequireDefault(_nav_dispatcher);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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
      id = id ? id : (0, _uniqueId3.default)('nav');

      nav_items.push({ items: this.setItems(items), id: id });
    },
    changeActive: function changeActive(id, nav_id) {
      var items = this.getNavItems(nav_id);
      items = (0, _map3.default)(items, function (item) {
        item.active = item.id === id;
        return item;
      });
    },
    getNavItems: function getNavItems(id) {
      if (id) {
        var ni = (0, _find3.default)(nav_items, function (ni) {
          return ni.id === id;
        });
        if (ni) return ni.items;
      }

      return (0, _first3.default)(nav_items).items;
    },
    setNavItems: function setNavItems(id, items) {
      nav_items = (0, _map3.default)(nav_items, function (ni) {
        if (ni.id === id) {
          ni.items = items;
        }
        return ni;
      });
    },
    setItems: function setItems(items) {
      return (0, _map3.default)(items, function (item) {
        if (!(0, _has3.default)(item, 'active')) item.active = false;
        if (!(0, _has3.default)(item, 'id')) item.id = (0, _uniqueId3.default)();
        return item;
      });
    }
  };

  var NavStore = Object.assign({}, _events.EventEmitter.prototype, store);

  var registeredCallback = function registeredCallback(payload) {
    var action = payload.action;
    switch (action.type) {
      case 'ADDING_NAV':
        NavStore.addNavItems(action.nav, action.id);
        NavStore.emitChange('adding');
        break;

      case 'CHANGE_ACTIVE':
        NavStore.changeActive(action.id, action.nav_id);
        NavStore.emitChange('change');
        break;

      case 'UPDATE_NAV':
        NavStore.setNavItems(action.id, action.nav);
        NavStore.emitChange('update');
        break;
    }
  };

  NavStore.dispatchToken = _nav_dispatcher2.default.register(registeredCallback);
  NavStore.setMaxListeners(0);

  exports.default = NavStore;
  module.exports = exports['default'];
});