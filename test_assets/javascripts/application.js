const _ = require("lodash");

const React = require("react");
const ReactDom = require('react-dom')

const Touch = require("../../src/components/touch")

var i = 1;
let config = []
let config2 = []
var test = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quae sint iste, eius molestias. Laboriosam architecto eaque, similique, ut tempora, commodi id veniam delectus temporibus blanditiis quas inventore. Nisi, commodi."

do{
  let name = test.substring(0, i*5)
  let nav ={name:name, title:`Click here to go to Nav item ${i}`}
  if(i%2 === 0){
    nav.data = {id:i, additonal:`foo${i}`}
  } else {
    nav.href = "#"
  }

  nav.active = (i===1)
  config.push(nav);
  config2.push({name:`NavItem ${i}`, title:`Click here to go to Nav item ${i}`, href:"http://better.org.uk"})
  i++;
} while(i < 6)



function callback(name, data){
  console.log("%j has been click", name);
  console.log(data);
}

ReactDom.render(
  <Touch navitems={config} callback={callback} />,
  document.getElementById('nav')
);

ReactDom.render(
  <Touch navitems={config2} callback={callback} />,
  document.getElementById('nav2')
);