import NavDispatcher from '../../src/dispatchers/nav_dispatcher';

import {checkDispatcher as dispatcherHelper} from '@djforth/react-jasmine-wp';

describe('NavDispatcher', function(){
  let options = [
    {
      handler: 'addingNavItems'
      , source: 'ADDING_NAV'
    }
    , {
      handler: 'changeActive'
      , source: 'CHANGE_ACTIVE'
    }
  ];

  dispatcherHelper(NavDispatcher, options);
});
