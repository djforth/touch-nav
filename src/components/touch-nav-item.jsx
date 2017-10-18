 import React from 'react';
 import _, {omit} from 'lodash';

// Mixins
import {
  checker
  , css_mixins as cssMixins
  , text_mixins as textMixins
} from 'morse-react-mixins';

// Flux
import NavActions from '../actions/nav_actions';
import NavStore from '../stores/nav_store';

class TouchNavItem extends React.Component{
   constructor(props){
    super(props);
    // console.log('props', this.props.nav_item);
    this.listCss = ['date-nav-item', {'active': this.props.nav_item.active}];
    this.state = {list: this.getClasses(this.listCss)};
  }

  shouldComponentUpdate(nextProps, nextState){
    return (nextProps.nav_item.active !== this.props.nav_item.active) ||
      nextState.list !== this.state.list;
  }

  componentWillReceiveProps(nextProps){
    this.listCss = ['date-nav-item', {'active': nextProps.nav_item.active}];
    this.setState({list: this.getClasses(this.listCss)});
  }

  _clicked(e){
    e.preventDefault();

    let item = this.props.nav_item;
    let cb = this.props.callback;
    let data = _.omit(item, 'title');
    if (checker.isMounted(this)){
      NavActions.changeActive(this.props.nav_item.id, this.props.nav_id);
      if (_.isFunction(cb)){
        cb.apply(this, _.values(data));
      }
    }
  }

  _internal(navitem){
    return (
      <a href="#"
         title={navitem.title}
         onClick={this._clicked.bind(this)}
         className="date-nav-item-link">
          {navitem.name}
      </a>
    );
  }

   _external(navitem){
    return (
      <a href={navitem.href}
         title={navitem.title}
         className="date-nav-item-link">
         {navitem.name}
      </a>
    );
  }

  _renderLink(navitem){
    return (_.has(navitem, 'href')) ? this._external(navitem) : this._internal(navitem);
  }


  render(){
    let navitem = this.props.nav_item;
    return (
      <li role="presentation" className={this.state.list}>
        {this._renderLink(navitem)}
      </li>
    );
  }
}

Object.assign(TouchNavItem.prototype, cssMixins);
Object.assign(TouchNavItem.prototype, textMixins);
// Object.assign(TouchNavItem.prototype, checker);


export default TouchNavItem;
