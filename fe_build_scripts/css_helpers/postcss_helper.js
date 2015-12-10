var atImport     = require("postcss-import")
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
  , cssMQPacker
  , duplicates
  , longhand
  , mergeRules
];

module.exports = function(css, fileName, mapName, cb){
    console.log("post >>>>> ", fileName)
    postcss(plugins)
      .use(atImport)
      .process(css)
      .then(function (post) {
        // console.log("PostCSS'ed", fileName)
        post.warnings().forEach(function (warn) {
            console.warn(warn.toString());
        });
        console.log("PostCSS'ed", fileName)
        create.file(fileName, post.css.toString()+"\r\r /*# sourceMappingURL="+mapName+" */");

        cb();
    });

  }
