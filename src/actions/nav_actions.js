 import NavDispatcher from '../dispatchers/nav_dispatcher';

export default {
  addingItems: (items, id)=>{
    NavDispatcher.addingNavItems({
      type: 'ADDING_NAV'
      , nav: items
      , id: id
    });
  }

  , changeActive: (id, nav_id)=>{
    NavDispatcher.changeActive({
      type: 'CHANGE_ACTIVE'
      , nav_id: nav_id
      , id: id
    });
  }

  , updateItems: (items, id)=>{
    NavDispatcher.updateNavItems({
      type: 'UPDATE_NAV'
      , nav: items
      , id: id
    });
  }
};
