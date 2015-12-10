const React = require("react")
    , _     = require("lodash");

//Mixins
let mixins = require("morse-react-mixins");
const [cssMixins, textMixins]  = [mixins.css_mixins, mixins.text_mixins];


//Flux
const NavActions = require("../actions/nav_actions")
    , NavStore   = require("../stores/nav_store");


class TouchNavItem extends React.Component {
   constructor(props) {
    super(props);
    // console.log('props', this.props.nav_item);
    this.listCss = ["date-nav-item", {"active":this.props.nav_item.active}]
    this.state = {list:this.getClasses(this.listCss)};
  }

  shouldComponentUpdate(nextProps, nextState){
    return (nextProps.nav_item.active !== this.props.nav_item.active) || nextState.list !== this.state.list
  }

  componentWillReceiveProps(nextProps){
    this.listCss = ["date-nav-item", {"active":nextProps.nav_item.active}];
    this.setState({list:this.getClasses(this.listCss)});
  }

  _clicked(e){
    e.preventDefault();
    let item = this.props.nav_item;
    let cb = this.props.callback;
    let data = _.omit(item, 'title');
    NavActions.changeActive(this.props.nav_item.id, this.props.nav_id)
    if(_.isFunction(cb)){
      cb.apply(this, _.values(data));
    }
  }

  _internal(navitem){
    return(
      <a href="#"
         title={navitem.title}
         onClick={this._clicked.bind(this)}
         className="date-nav-item-link">
          {navitem.name}
      </a>
    )

  }

   _external(navitem){
    return (
      <a href={navitem.href}
         title={navitem.title}
         className="date-nav-item-link">
         {navitem.name}
      </a>
    )
  }

  _renderLink(navitem){
    return (_.has(navitem, "href")) ? this._external(navitem) : this._internal(navitem);
  }


  render(){
    let navitem = this.props.nav_item
    return (
      <li role="presentation" className={this.state.list}>
        {this._renderLink(navitem)}
      </li>
    );
  }
}

Object.assign(TouchNavItem.prototype, cssMixins);
Object.assign(TouchNavItem.prototype, textMixins);


module.exports = TouchNavItem;