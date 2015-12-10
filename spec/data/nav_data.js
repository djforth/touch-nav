
var test = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quae sint iste, eius molestias. Laboriosam architecto eaque, similique, ut tempora, commodi id veniam delectus temporibus blanditiis quas inventore. Nisi, commodi."

module.exports = function(n=10){
  var i = 1;
  let config = []
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
    i++;
  } while(i < (n+1))

  return nav
}

