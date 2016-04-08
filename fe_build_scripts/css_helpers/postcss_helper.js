var atImport     = require("postcss-import")
  , _            = require("lodash")
  , autoprefixer = require('autoprefixer')
  , create       = require('../utils/folder_helpers')
  , cssMQPacker  = require("css-mqpacker")
  , duplicates   = require('postcss-discard-duplicates')
  , importInline = require("postcss-import")
  , longhand     = require("postcss-merge-longhand")
  , mergeRules   = require("postcss-merge-rules")
  , postcss      = require('postcss');

var plugins = [
    autoprefixer
];

module.exports = function(css, fileName, mapName, cb){
    console.log("postcss", fileName)
    postcss(plugins)
      .use(atImport)
      .process(css, {from: fileName,
        to:fileName, annotation:true, map: { inline: false }})
      .then(function (post) {
        console.log(fileName)
        post.warnings().forEach(function (warn) {
            console.warn(warn.toString());
        });

        create.file(fileName, post.css.toString()+"\r\r /*# sourceMappingURL="+mapName+" */");

        if(post.map) create.file(fileName+".map", post.map);


        if(_.isFunction(cb)) cb(fileName);

    });

  }
