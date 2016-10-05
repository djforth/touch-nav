// Karma configuration
// Generated on Mon Jul 11 2016 08:49:56 GMT+0100 (BST)
var path = require('path');
// var webpack = require('webpack');

/* eslint-disable */
var PATHS = {
  src: path.resolve(__dirname + '/app/assets_uncompiled/javascripts')
  , dist: path.resolve(__dirname + '/app/assets/javascripts')
};


module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      './spec/test_bundle.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './spec/test_bundle.js': [ 'webpack', 'sourcemap' ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

    specReporter:{
      maxLogLines: 5,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    webpack:{
      // context: PATHS.src,
      devtool: 'inline-source-map'
      , plugins: [
      ]
      , externals:{
        // cheerio: 'window',
        // jsdom: 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },

      module: {
        loaders: [{
          test: /\.js$/
          , loader: 'babel'
          // , include: PATHS.src
          , exclude: path.resolve(__dirname, 'node_modules')
          , query: {
            cacheDirectory: true
            , presets: ['airbnb']
            , plugins: [ 'istanbul', 'rewire']

          }
        }
        , {
          test: /\.json$/
          , loader: 'json'
        }]

        // , postLoaders: [ {
        //   test: /\.js$/,
        //   exclude: /(spec|node_modules|bower_components)\//,
        //   loader: 'istanbul-instrumenter'
        // }]
      }
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    coverageReporter: {
      type: 'text-summary'
     // reporters: [
     //    // reporters not supporting the `file` property
     //    { type: 'html', subdir: 'report-html' },
     //    // reporters supporting the `file` property, use `subdir` to directly
     //    // output them in the `dir` directory
     //    { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
     //    { type: 'text', subdir: '.', file: 'text.txt' }

     //  ]
      , dir: 'coverage/' //path to created html doc
      , instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    autoWatchBatchDelay: 300,

    plugins:[ 'karma-jasmine'
      , 'karma-firefox-launcher'
      , 'karma-chrome-launcher'
      , 'karma-safari-launcher'
      , 'karma-phantomjs-launcher'
      , 'karma-spec-reporter'
      , 'karma-babel-preprocessor'
      , 'karma-sourcemap-loader'
      , 'babel-preset-es2015'
      , 'babel-preset-es2016'
      , 'babel-preset-es2017'
      , 'karma-webpack'
      , 'karma-coverage'
    ],

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
