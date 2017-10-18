// Libraries
import React from 'react';
import _ from 'lodash';

import ViewportDetect from '@djforth/viewport-detection-fp';

// _.mapValues = mapValues;


import {
  css_mixins as cssMixins
  , text_mixins as textMixins
  , widths_mixins as widthsMixins
} from 'morse-react-mixins';

// Flux
import NavActions from '../actions/nav_actions';
import NavStore from '../stores/nav_store';

// Utils
import touch from '../utils/touch_processing';
// Components
import NavItem from './touch-nav-item';
import LeftArrow from './presentational/left_arrow';

class Touch extends React.Component{
  constructor(props){
    super(props);

    let id = _.uniqueId('nav');
    this.directions;
    this.holder_ref;
    this.navlist;
    NavActions.addingItems(this.props.navitems, id);
    this.left  = ['nav-mover', 'move-left', {hidden: false}];
    this.right = ['nav-mover', 'move-right', {hidden: false}];
    this.buttonMoveLeft = this._buttonMove.bind(this, 'left');
    this.buttonMoveRight = this._buttonMove.bind(this, 'right');
    this.pos   = 0;
    this.state = {listWidth: 1000, listPos: 0, id: id, navitems: NavStore.getNavItems(id), left: this.getClasses(this.left), right: this.getClasses(this.right), showBtn: true};
  }

  componentDidMount(){
    this.vpDetect = ViewportDetect();
    this.vpDetect.addCallback((device)=>{
      this.setState({device});
    });
    this.vpDetect.track();
    // this.detect = new ViewportDetect();
    this.device = this.vpDetect.getDevice();

    let width = this._getWidths();
    this.setState({listWidth: width});
    // console.log(this.detect.removeCallback(this.vp_id));
    NavStore.addChangeListener('change', this._onChange.bind(this));
    // NavStore.addChangeListener("adding", this._onAdd.bind(this));
  }

  componentDidCatch(error, info){
    // Display fallback UI
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  componentDidUpdate(){
    let width = this._getWidths();
    if (width !== this.state.listWidth){
      this.setState({listWidth: width});
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props.navitems !== nextProps.navitems){
      NavActions.updateItems(nextProps.navitems, this.state.id);
      this.pos = 0;
      this.setState({navitems: NavStore.getNavItems(this.state.id), listPos: 0});
    }
  }

  componentWillUnmount(){
    NavStore.removeChangeListener('change', this._onChange);
  }

  _onViewChange(){
    this._showButtons(this.state.listWidth);
    this.setState({listPos: 0});
  }

  _onChange(){
    let id = this.state.id;
    this.setState({navitems: NavStore.getNavItems(id)});
  }

  _getDistance(move){
    if (_.isEmpty(move)) return 0;

   return  _.reduce(move, (prev, cur)=>{
      return prev + cur;
    });
  }

  _showButtons(width){
    let holder = this._getHolderWidth();
    let show = (width > holder);

    if (show !== this.state.showBtn){
      this.left = this.setValue(this.left, 'hidden', !show);
      this.right = this.setValue(this.right, 'hidden', !show);

      this.setState({left: this.getClasses(this.left), right: this.getClasses(this.right), showBtn: show});
    }
  }

  _getHolderWidth(){
    return this.holder_ref.offsetWidth;
  }

  _getWidths(){
    if (this.navlist){
      this.convertDomlist(this.navlist.querySelectorAll('li'));
      let width = Math.ceil(this.getWidths());
      this._showButtons(width);
      return width;
    }

    return this.state.listWidth;
  }

  _setStyle(){
    let styles = {'width': this.state.listWidth, 'left': this.state.listPos};
    return Object.values(styles).map((v)=>{
      return `${v.toString()}px`;
    });
  }

  _buttonMove(dir, e){
    e.preventDefault();
    this._mover(dir);
  }

  _mover(dir){
    let elms = this.getAllWidths();
    if (dir === 'left' && this.pos > 0){
      this.pos--;
    } else if ((dir === 'right' && this.pos < elms.length)){
      this.pos++;
    }

    let move  = _.map(elms.slice(0, this.pos), 'width');
    let mover = -this._getDistance(move);
    let holder = this._getHolderWidth();
    if (this.state.listWidth+mover < holder){
      mover = -(this.state.listWidth - holder);
    }

    this.setState({listPos: mover});
  }

  _renderNav(){
    let navitems;
    if (_.isArray(this.state.navitems)){
      navitems = _.map(this.state.navitems, (ni, i)=>{
        let key = this.createId(ni.name, i, 'touchnav');

        return (
          <NavItem
            key      = {key}
            nav_id   = {this.state.id}
            callback = {this.props.callback}
            nav_item = {ni}
         />);
      });
    } else {
      navitems = '';
    }

    return (_.isEmpty(navitems)) ? '' : navitems;
  }

  _touchCancel(e){
    // console.log("cancel", _.first(e.touches))
  }

  _touchEnd(e){
    let dir =  this.directions.getDirection();
    // console.log("end", dir)
    if (dir.moveX !== ''){
      this._mover(dir.moveX);
    }
  }

  _touchMove(e){
    this.directions.addMove(e.touches);
    // console.log("move", _.first(e.touches))
  }

  _touchStart(e){
    this.directions = touch(e.touches);
    // console.log("start", _.first(e.touches))
  }

  render(){
    return (
      <nav className="touch-nav"
        onTouchCancel={this._touchCancel.bind(this)}
        onTouchEnd={this._touchEnd.bind(this)}
        onTouchMove={this._touchMove.bind(this)}
        onTouchStart={this._touchStart.bind(this)}
      >
        <a href="#" className={this.state.left} onClick={this.buttonMoveLeft}>
        <span className="hidden">right</span>
        </a>
        <div className="list-holder" ref={(e)=>{this.holder_ref = e;}}>
          <ul className="nav-items" style={this._setStyle()} onLoad={this._getWidths.bind(this)} ref={(e)=>{this.navlist = e;}}>
            {this._renderNav()}
          </ul>
        </div>
        <a href="#" className={this.state.right}  onClick={this.buttonMoveRight}>
          <span className="hidden">right</span>
        </a>
      </nav>

    );
  }
}

Object.assign(Touch.prototype, cssMixins);
Object.assign(Touch.prototype, textMixins);
Object.assign(Touch.prototype, widthsMixins);

export default Touch;
