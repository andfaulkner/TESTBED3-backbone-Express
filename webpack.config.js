console.time('webpack config entirety');
//require('harmonize')(); // ensure es6 works

//Fix root path referenced by require
require('rootpath')();

require('babel');

// require('babel/register');
Object.getPrototypeOf.toString = function() {
    return Object.toString();
};

/**
 * Webpack configuration for module handling
 */
var path = require('path');
var _      = require('lodash');
var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
var fs = require('fs');
var glob = require('glob');

// require('dustjs-linkedin/dist/dust-core');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

// var entryPts = (function entryPts(){
//     var retObj = { };
//     console.time('entryPts');
//     var files1 = [];
//         // _.map(glob.sync('./client/js/*.js'),
//         //               function(file) { return _.rest(file.split('/')).join('/'); });
//     var files2 = _.map(glob.sync('./client/components/**/*.js'),
//                       function(file) { return _.rest(file.split('/')).join('/'); });
//     var files = files1.concat(files2);
//     _.each(files, function(file){
//         retObj[file] = './' + file;
//     });
//     console.timeEnd('entryPts');
//     return retObj;
// }());

// console.log('entryPts');
// console.log(entryPts);

console.time('webpack module exports');

// ANOTHER TIME: get the webpack dev server working
// var compiler = webpack({
module.exports = {
    //location from which all other routes are derived - base path
    'context': __dirname,

    //left side is output file; right side is input file (left used for [name] in output)
    // 'entry': entryPts,
    'entry': {
        './client/components/react-1/react-1-index.js':
                './client/components/react-1/react-1-index.js'
    },

    'output': {
        path: path.join(__dirname, '.build'),
        filename: '[name]' //B sure 2 use [name] or [id] in filename if using multiple entry pts
    },

    //Handle SCSS files - convert to CSS    //TODO make this work with '.less' files
    'module': {
        loaders: [
            // { test: /\.es6.js$/, loader: 'babel-loader' }
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                // exclude: /(bower_components|\.build(cache)?)/,
                include: [
                    path.resolve(__dirname, 'client/components'),
                    path.resolve(__dirname, 'client/components/react-1'),
                    path.resolve(__dirname, 'client/js'),
                    path.resolve(__dirname, 'node_modules/react'),
                    path.resolve(__dirname, 'node_modules/react-dom'),
                    path.resolve(__dirname, 'node_modules/react-panels'),
                    path.resolve(__dirname, 'node_modules/react-redux'),
                    path.resolve(__dirname, 'node_modules/react-router'),
                    path.resolve(__dirname, 'node_modules/react-tap-event-plugin'),
                    path.resolve(__dirname, 'node_modules/react-tools'),
                    path.resolve(__dirname, 'node_modules/redux'),
                    path.resolve(__dirname, 'node_modules/redux-devtools')
                ],
                query: {
                    cacheDirectory: path.join(__dirname, '.buildcache'),
                    nonStandard: true //allows jsx
                }
            }
        ]
    },

    'cache': true,

    //compile for use in a browser environment
    'target': 'web',

    //Keep going even if an error occurs
    'bail': false,

    //Rebuild when any file pointed to changes
    'watch': false,

    //Find libraries in the following locations
    'resolve': {
        root: [path.join(__dirname, 'node_modules')],
        fallback: [path.join(__dirname, 'node_modules')],
        extensions: ['', '.js', '.json', '.jsx'],
        modulesDirectories: ['node_modules']
    },

    'debug': true,

    'plugins': [

        //Remove duplicate JS code
        new webpack.optimize.DedupePlugin(),

        //make the following globally available
        new webpack.ProvidePlugin({
            _: 'lodash',
            async: 'async',
            Backbone: 'backbone',
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jquery': 'jquery',
            bootstrap: 'bootstrap',
            React: 'react'
        })
    ],

    stats: {
        // Nice colored output
        colors: true
    }
};

// ANOTHER TIME: get the webpack dev server working
// var server = new WebpackDevServer(compiler, {
//     contentBase: path.join(__dirname, 'client'),

//     hot: true,
//     quiet: false,
//     noInfo: false,
//     lazy: true,

// });

console.timeEnd('webpack module exports');
console.timeEnd('webpack config entirety');

console.time('webpack config entirety');