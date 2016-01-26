//Libraries
const React = require("react");
const _     = require("lodash");

// Morse Libraies
const ViewportDetect = require("viewport-detection-es6");

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
    NavActions.addingItems(this.props.navitems, id);
    this.left  = ["nav-mover", "move-left", {hidden:false}];
    this.right = ["nav-mover", "move-right", {hidden:false}]
    this.pos   = 0;
    this.state = {listWidth:1000, listPos:0, id:id, navitems:NavStore.getNavItems(id), left:this.getClasses(this.left), right:this.getClasses(this.right), showBtn:true, holder_ref:`${id}holder`}
  }

  componentDidMount() {
    this.detect = new ViewportDetect();
    let device = this.detect.getDevice();


    this.vp_id = this.detect.trackSize(this._onViewChange.bind(this));

    let width = this._getWidths();
    this.setState({listWidth:width});
    // console.log(this.detect.removeCallback(this.vp_id));
    NavStore.addChangeListener("change", this._onChange.bind(this));
    // NavStore.addChangeListener("adding", this._onAdd.bind(this));
  }

  componentDidUpdate(){
    let width = this._getWidths();
    if(width !== this.state.listWidth){
      this.setState({listWidth:width});
    }
  }

  componentWillReceiveProps(nextProps){
    // console.log("new props", nextProps.navitems)
    // console.log(this.props.navitems !== nextProps.navitems)
    if(this.props.navitems !== nextProps.navitems){
      NavActions.updateItems(nextProps.navitems, this.state.id);
      this.pos = 0;
      this.setState({navitems:NavStore.getNavItems(this.state.id), listPos:0});
    }
  }

  componentWillUnmount() {
    this.detect.removeCallback(this.vp_id);
    NavStore.removeChangeListener("change", this._onChange);
    // NavStore.removeChangeListener("add", this._onAdd);
  }

  _onViewChange(){
    this._showButtons(this.state.listWidth);
    this.setState({listPos:0});
  }

  // _onAdd(){
  //   this.setState({navitems:NavStore.getNavItems(this.state.id)});
  // }

  _onChange(){
    let id = this.state.id;
    this.setState({navitems:NavStore.getNavItems(id)});
  }

  _getDistance(move){
    if(_.isEmpty(move)) return 0;

   return  _.reduce(move, (prev, cur)=>{
      return prev + cur;
    });
  }

  _showButtons(width){
    let holder = this._getHolderWidth();
    let show = (width > holder);

    if(show !== this.state.showBtn){
      this.left = this.setValue(this.left, "hidden", !show);
      this.right = this.setValue(this.right, "hidden", !show);

      this.setState({left:this.getClasses(this.left), right:this.getClasses(this.right), showBtn:show})
    }
  }

  _getHolderWidth(){
    return _.get(this.refs, this.state.holder_ref).offsetWidth;
  }

  _getWidths(){
    // return 0;
    this.convertReactComps(_.omit(this.refs, this.state.holder_ref));
    let width = Math.ceil(this.getWidths())
    this._showButtons(width)
    return width;
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
    let holder = this._getHolderWidth();
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

    return (_.isEmpty(navitems)) ? "" : navitems
  }

  _touchCancel(e){
    // console.log("cancel", _.first(e.touches))
  }

  _touchEnd(e){
    let dir =  this.directions.getDirection()
    // console.log("end", dir)
    if(dir.moveX !== ""){
      this._mover(dir.moveX);
    }
  }

  _touchMove(e){
    this.directions.addMove(e.touches)
    // console.log("move", _.first(e.touches))
  }

  _touchStart(e){
    this.directions = touch(e.touches);
    // console.log("start", _.first(e.touches))
  }

  _setCss(type){
    let t;
    switch(type){
      case "main":
        t = (_.has(this.props, "main_css")) ? this.props.main_css : "touch-nav";
      break;
      case "ul":
        t = (_.has(this.props, "ul_css")) ? this.props.ul_css : "nav-items";
      break;
    }

    return t


  }

  render(){

    return (
      <nav className={this._setCss("main")}
        onTouchCancel={this._touchCancel.bind(this)}
        onTouchEnd={this._touchEnd.bind(this)}
        onTouchMove={this._touchMove.bind(this)}
        onTouchStart={this._touchStart.bind(this)}
      >
        <a href="#" className={this.state.left} onClick={this._buttonMove.bind(this, "left")}>
          <span className="hidden">left</span>
        </a>
        <div className="list-holder" ref={this.state.holder_ref}>
          <ul className={this._setCss("ul")} style={this._setStyle()} onLoad={this._getWidths.bind(this)}>
            {this._renderNav()}
          </ul>
        </div>
        <a href="#" className={this.state.right}  onClick={this._buttonMove.bind(this, "right")}>
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
