var path = require('path');
var webpack = require('webpack');
var HappyPack = require('happypack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/* eslint-disable */

var PATHS = {
  src: path.resolve(__dirname + '/../src')
  , dist: path.resolve(__dirname + '/../assets/')
};

var plugins = [
   new HappyPack({
    // loaders is the only required parameter:
    id: 'jsx',
    threads: 4,
    loaders: ['babel']
    // customize as needed, see Configuration below
  })
  , new webpack.optimize.DedupePlugin()
  , new ExtractTextPlugin('application.css', {allChunks: false})
]

if(process.env.NODE_ENV === 'production'){
  let prod = [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: false,
      mangle: true,
      minimize: true
    })
    , new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ];
  plugins = plugins.concat(prod)
}

/* eslint-enable */
module.exports = {
  context: PATHS.src
  , devtool: (process.env.NODE_ENV === 'production') ? '' : 'inline-source-map'

  , entry: ['./application.js']

  , resolve: {
    extensions: ['', '.js', '.jsx']
  }

  , plugins: plugins

  , output: {
    path: PATHS.dist // Save to Rails Asset Pipeline
    , publicPath: '/assets/' // Required for webpack-dev-server
    , filename: 'bundle.js'
  }

  , module: {
    loaders: [{
      test: /\.js$/
      , loader: 'happypack/loader?id=jsx'
      , include: PATHS.src
      , exclude: /node_modules/
    } ,  {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", ['css?sourceMap','sass?sourceMap'])
    }
    , { test: /\.(png|jpg|gif)$/, loader: 'file-loader' }
    ]
  }
  ,  sassLoader: {
    includePaths: [path.resolve(__dirname, "../bower_components"), path.resolve(__dirname, "../stylesheets")]
  }
};

