//Libraries
const React = require("react");
const _     = require("lodash");


let mixins = require("morse-react-mixins");
const [cssMixins, textMixins, widthsMixins]  = [mixins.css_mixins, mixins.text_mixins, mixins.widths_mixins];

//Flux
const NavActions = require("../actions/nav_actions")
    , NavStore   = require("../stores/nav_store");

//Utils
const touch = require("../utils/touch_processing")

// Components
const NavItem = require("./touch-nav-item");

class Touch extends React.Component {
  constructor(props) {
    super(props);
    let id = _.uniqueId("nav");
    this.directions;
    NavActions.addingItems(this.props.navitems, id)
    this.pos   = 0;
    this.state = {listWidth:1000, listPos:0, id:id, navitems:NavStore.getNavItems(id)}
  }

  componentDidMount() {
    let width = this._getWidths();
    this.setState({listWidth:width});
    NavStore.addChangeListener("change", this._onChange.bind(this));
  }

  componentDidUpdate(){
    let width = this._getWidths();
    if(width !== this.state.listWidth){
      this.setState({listWidth:width});
    }
  }

  componentWillUnmount() {
    NavStore.removeChangeListener("change", this._onChange);
  }

  _onChange(){
    let id = this.state.id;
    this.setState({navitems:NavStore.getNavItems(id)});
  }

  _getDistance(move){
    if(_.isEmpty(move)) return 0;

   return  _.reduce(move, (prev, cur)=>{
      return prev + cur
    });
  }

  _getWidths(){
    this.convertReactComps(_.omit(this.refs, "holder"));
    return Math.ceil(this.getWidths());
  }

  _setStyle(){
    let styles = {"width":this.state.listWidth, left:this.state.listPos}
    return _.mapValues(styles, (v)=> {
      return v.toString();
    });
  }

  _buttonMove(dir, e){
    e.preventDefault();
    this._mover(dir);
  }

  _mover(dir){

    let elms = this.getAllWidths();
    if(dir === "left" && this.pos > 0){
      this.pos--;
    } else if((dir === "right" && this.pos < elms.length)){
      this.pos++;
    }

    let move  = _.pluck(_.take(elms, this.pos), "width");
    let mover = -this._getDistance(move);
    let holder = _.get(this.refs, 'holder').offsetWidth;
    if(this.state.listWidth+mover < holder){
      mover = -(this.state.listWidth - holder);
    }

    this.setState({listPos:mover});
  }

  _renderNav(){
    let navitems
    if(_.isArray(this.state.navitems)){
      navitems = _.map(this.state.navitems, (ni, i)=>{
        let key = this.createId(ni.name, i);

        return (
          <NavItem
            ref      = {key}
            key      = {key}
            nav_id   = {this.state.id}
            callback = {this.props.callback}
            nav_item = {ni}
         />)
      })
    } else {
      navitems = "";
    }

    return navitems
  }

  _touchCancel(e){
    console.log("cancel", _.first(e.touches))
  }

  _touchEnd(e){
    let dir =  this.directions.getDirection()
    console.log("end", dir)
    if(dir.moveX !== ""){
      this._mover(dir.moveX);
    }
  }

  _touchMove(e){
    this.directions.addMove(e.touches)
    console.log("move", _.first(e.touches))
  }

  _touchStart(e){
    this.directions = touch(e.touches);
    console.log("start", _.first(e.touches))
  }

  render(){

    return (
      <nav className="touch-nav"
        onTouchCancel={this._touchCancel.bind(this)}
        onTouchEnd={this._touchEnd.bind(this)}
        onTouchMove={this._touchMove.bind(this)}
        onTouchStart={this._touchStart.bind(this)}
      >
        <a href="#" className="nav-mover move-left" onClick={this._buttonMove.bind(this, "left")}>
          <span className="hidden">left</span>
        </a>
        <div className="list-holder" ref="holder">
          <ul className="nav-items" style={this._setStyle()} onLoad={this._getWidths.bind(this)}>
            {this._renderNav()}
          </ul>
        </div>
        <a href="#" className="nav-mover move-right" onClick={this._buttonMove.bind(this, "right")}>
          <span className="hidden">right</span>
        </a>
      </nav>

    );
  }
}

Object.assign(Touch.prototype, cssMixins);
Object.assign(Touch.prototype, textMixins);
Object.assign(Touch.prototype, widthsMixins);

module.exports = Touch;
