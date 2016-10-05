const _ = require("lodash");

const React = require("react");
const ReactDom = require('react-dom')

const Touch = require("./components/touch")

import '../stylesheets/application.scss'

var test = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quae sint iste, eius molestias. Laboriosam architecto eaque, similique, ut tempora, commodi id veniam delectus temporibus blanditiis quas inventore. Nisi, commodi."


function createConfigs(){
  let config = []
  let config2 = []
  var i = 1;
  do{
    let num = _.random(0,i)
    let name = test.substring(num, num+10)
    let nav ={name:name, title:`Click here to go to Nav item ${i}`}
    if(i%2 === 0){
      nav.data = {id:i, additonal:`foo${i}`}
    } else {
      nav.href = "#"
    }

    nav.active = (i===1)
    config.push(nav);
    let n = _.random(1, 100)
    config2.push({name:`NavItem ${n}`, title:`Click here to go to Nav item ${n}`, href:"http://better.org.uk"})
    i++;
  } while(i < _.random(6,12));
  console.log(config, config2)
  return {one:config, two:config2};
}

function addNavs(){
  let config = createConfigs();
  console.log("add", config)
  ReactDom.render(
    <Touch navitems={config.one} callback={callback} />,
    document.getElementById('nav')
  );

  ReactDom.render(
    <Touch navitems={config.two} callback={callback} />,
    document.getElementById('nav2')
  );
}


function callback(name, data){
  console.log("%j has been click", name);
  console.log(data);
}

addNavs();

let link = document.getElementById("update");

link.addEventListener("click", (e)=>{
  e.preventDefault();
  console.log("click")

  addNavs();
})