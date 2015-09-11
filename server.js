/**
 * LAUNCH EXPRESSJS SERVER FROM HERE.
 */

//************************ GLOBAL NODE MODULES ***********************//
//Fix root path referenced by require
require('rootpath')();

//Ensure infinite number of concurrent sockets can be open
var http = require('http');
http.globalAgent.maxSockets = Infinity;

var path = require('path');
//********************************************************************//

// get app settings
var config = require('config/default');

//**************************** ECMA6 SETUP ****************************//
//ECMA 6 polyfill modules
require('harmonize')(); // ensure es6 works
require('babel/register');

//unpolyfillable function patched with a "close-enough" behaviour
Object.getPrototypeOf.toString = function() {
    return Object.toString();
};
//********************************************************************//

//**************************** ERROR HANDLING ****************************//
if (process.env.NODE_ENV !== 'production') {
    Error.stackTraceLimit = Infinity;
    require('trace'); // active long stack trace
    require('clarify'); // Exclude node internal calls from the stack
}

var log = require('server/winston-logger');
require('./server/uncaught-error-handler');
//********************************************************************//

//******************************* SERVER *******************************//
var express = require('express');

var app = require('server/rest-api')(express())
    .use('/', express.static(path.join(__dirname, 'public')));
//**********************************************************************//

//Build Express app itself (loads & runs a constructor module), serves over web
app.listen(config.server.port, function() {
    return log.info('example app listening! Bootup done!'); // server
});