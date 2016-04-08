// const path      = require('path');

var pckage    = require('../package')
  , path      = require('path');

var assets_in   = pckage.config.assets_in || path.join("test_assets");
var assets_out  = pckage.config.assets_out || path.join("app", "assets");
assets_out = path.join(assets_out)

var config  = pckage.config;

var js = pckage.js_config;

var img_ext  = ['*.png', '*.gif', '*.jpg', '*.jpeg', '*.svg']

var rails_server = (config.rails_port) ? "http://localhost:"+config.rails_port : "http://localhost:3030"

// var sprite_ext = pckage.sprite_config.ext || ["*.png", "*.gif"];

module.exports = {
  // Main assets output config
    assets_main      : assets_out
  // browserSync config
  , browserSync : {
      file   : ["app/views/**/*", "app/helpers/**/*"]
    , port   : Number(config.port) || 9090
    , proxy  : rails_server
    , server : config.name || "server"
    , uiport : Number(config.uiport) || 8080
  }
  // Images configuration
  , images : {
    ext    : img_ext
  , input  : path.join(assets_in, "images")
  , output : assets_out
  , temp   : path.join("tmp", "images")
  }

  // SCSS config
  , stylesheets : {
    ext    : ['*.css', '*.css.map', "*.gz"]
  , input  : path.join(assets_in, "stylesheets")
  , output : assets_out
  , temp   : path.join("tmp", "stylesheets")
  }
}
