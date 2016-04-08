var _     = require("lodash")
 , Bundle = require("@djforth/ap_browserify").bundle
 , config = require("@djforth/ap_browserify").config

function bundle(file, bs){
  console.log(file)
  Bundle(false, file, bs())
    .setOutput(file)
    .setFactor(config.get("factor"))
    .build(true)
}

module.exports = function(bs){
  console.log("separate", config.get("separate"))
  if(config.get("separate")){
    config.get("files").forEach(function(file){
      bundle(file, bs)
    })
  } else {
    bundle(undefined, bs)
  }
}
