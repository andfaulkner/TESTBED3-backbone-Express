console.time('webpack config entirety');
require('harmonize')(); // ensure es6 works

//Fix root path referenced by require
require('rootpath')();

require('babel/register');
Object.getPrototypeOf.toString = (() => (Object.toString()));

/**
 * Webpack configuration for module handling
 */
var path = require('path');
var async = require('async');
var _      = require('lodash');
var webpack = require('webpack');
var log = require('./server/debug/winston-logger');
var fs = require('fs');
var glob = require('glob');

// require('dustjs-linkedin/dist/dust-core');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

var entryPts = (function entryPts(){
    var retObj = { };
    console.time('entryPts');
    var files = _.map(glob.sync('./client/js/+(page*|index*).js'),
                      (file) => _.rest(file.split('/')).join('/'));
    _.each(files, (file) => retObj[file] = './' + file);
    console.timeEnd('entryPts');
    return retObj;
}());

console.log('entryPts');
console.log(entryPts);

console.time('webpack module exports');

module.exports = {

    //location from which all other routes are derived - base path
    'context': __dirname,

    //left side is output file; right side is input file (left used for [name] in output)
    'entry': entryPts,

    'output': {
        path: path.join(__dirname, '.build'),
        filename: '[name]' //B sure 2 use [name] or [id] in filename if using multiple entry pts
    },

    //Handle SCSS files - convert to CSS    //TODO make this work with '.less' files
    'module': {
        loaders: [
            // { test: /\.es6.js$/, loader: 'babel-loader' }
            {
                test: /\.js[x]$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components|\.build)/,
                query: {
                    cacheDirectory: path.join(__dirname, '.buildcache'),
                    optional: ['runtime'],
                    nonStandard: true //allows jsx
                }
            }
        ]
    },

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
        modulesDirectories: ['node_modules'],
    },

    'debug': true,

    'plugins': [

        //Remove duplicate JS code
        new webpack.optimize.DedupePlugin(),

        // new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('package.json', ['main']),

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
};
console.timeEnd('webpack module exports');
console.timeEnd('webpack config entirety');