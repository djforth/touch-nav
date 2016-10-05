var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

/* eslint-disable */
var PATHS = {
  src: path.resolve(__dirname + '/../src')
  , dist: path.resolve(__dirname + '/../assets/javascripts')
};

/* eslint-enable */
module.exports = {
  context: PATHS.src
  , devtool: 'inline-source-map'
  , entry: {
    application: [
      'webpack-dev-server/client?http://localhost:8080'
      , 'webpack/hot/only-dev-server'
      , './application.js'
    ]
  }

  // entry: ['babel-polyfill', path.join(PATHS.src, '/app.js')]

  , resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  }

  , plugins: [
    new webpack.HotModuleReplacementPlugin()
    , new ExtractTextPlugin('assets/application.css', {allChunks: false})
    , devFlagPlugin
  ]

  , output: {
    path: PATHS.dist
    , publicPath: 'http://localhost:8080/' // Required for webpack-dev-server
    , filename: 'assets/[name].js'
  }

  , module: {
    loaders: [{
      test: /\.js$/
      , loaders: ['babel']
      , include: PATHS.src
    }
    ,  {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", ['css?sourceMap','sass?sourceMap'])
    }
    , { test: /\.(png|jpg|gif)$/, loader: 'file-loader' }
    ]
  }
  ,  sassLoader: {
    includePaths: [path.resolve(__dirname, "../bower_components"), , path.resolve(__dirname, "../stylesheets")]
  }
};