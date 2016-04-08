// Inspired by https://github.com/fetch/node-sass-asset-functions/blob/master/lib/processor.js

var fs = require('fs')
  , path = require('path')
  , url  = require('url')
  , _    = require('lodash');

var mime = require('mime')
  , sizeOf = require('image-size');

// var store_images = require("../utils/cache_images");

var Processor = {

  asset_url:function(filepath, segment, done) {

    var http_path, sanitized_http_path, real_path;
    http_path = sanitized_http_path = this.http_path(filepath, segment);
    real_path = this.real_path(filepath, segment);

    var fragmentIndex = sanitized_http_path.indexOf('#'), fragment = '';
    if (~fragmentIndex) {
      fragment = sanitized_http_path.substring(fragmentIndex);
      sanitized_http_path = sanitized_http_path.substring(0, fragmentIndex);
    }

    var restoreFragment = function(url) {
      done(url + fragment);
    };

    var next = function(http_path) {
      restoreFragment(http_path);
    }.bind(this);


    next(sanitized_http_path);

  }

  , cache_bust:function(fileName){

    if(this.paths.filePaths){
      var obj = _.find(this.paths.filePaths, {original:fileName});

      if(_.isUndefined(obj)){
        return fileName;
      }
      return obj.file;
    }

    return fileName;
  }

  , defaults:function(opts){
    opts = opts || {};
    this.paths = _.defaults({
      images_path: 'public/assets',
      http_images_path: 'public/assets'
    }, opts);
  }

  , http_path:function(filepath, segment) {
    var file = path.join(this.paths['http_' + segment + '_path'], filepath).replace(/\\/g, '/');
    return file.replace(/public/, "");
  }

  , image_url:function(filepath, done) {
    var fp = this.cache_bust(filepath);
    this.asset_url(fp, 'images', done);
  }

  , image_width:function(filepath, done) {
    var fp = this.cache_bust(filepath);
    // sizes = sizeOf(this.real_path(fp, 'images'))
    sizeOf(this.real_path(fp, 'images'), function (err, size) {
      if(err){
        console.error(err)
        done(0)
      } else {
        done(size.width);
      }

    });
  }

  , image_height:function(filepath, done) {
    var fp = this.cache_bust(filepath);
    sizeOf(this.real_path(fp, 'images'), function (err, size) {
      if(err){
        console.error(err)
        done(0)
      } else {
        done(size.height);
      }

    });
  }

  , inline_image:function(filepath, mime_type, done) {
    var fp = this.cache_bust(filepath);
    var src = this.real_path(fp, 'images');

    // var stored64 = store_images.checkJson(fp);

    // if(stored64){
    //   done(stored64)
    // } else {
      mime_type = mime_type || mime.lookup(src);
      fs.readFile(src, function(err, data){
        if(err) {
          console.error(err)
          done("")
        } else {
          // store_images.addJson('data:'+mime_type+';base64,'+data.toString('base64'), fp)
          done('data:'+mime_type+';base64,'+data.toString('base64'));
        }
      });
    // }
  }

  , real_path:function(filepath, segment) {
    var sanitized_filepath = filepath.replace(/(#|\?).+$/, '');
    return path.resolve(this.paths[segment+"_path"], sanitized_filepath);
  }
}

module.exports = Processor;
