/**
 * LAUNCH EXPRESSJS SERVER FROM HERE.
 */

//************************ GLOBAL NODE MODULES ***********************//
//Fix root path referenced by require
require('rootpath')();

//Determine and store project root path
var path = require('path');
global.__projrootdir = path.join(process.mainModule.filename, '..');

//Ensure infinite number of concurrent sockets can be open
var http = require('http');
http.globalAgent.maxSockets = Infinity;
//********************************************************************//

// get app settings
var config = require('config/default');

//**************************** ECMA6 SETUP ****************************//
//ECMA 6 polyfill modules
require('harmonize')(); // ensure es6 works
require('babel/register');
require('babel/polyfill');

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

var log = require('server/debug/winston-logger');
require('server/debug/uncaught-error-handler');
//********************************************************************//

//******************************* SERVER *******************************//
var express = require('express');

var io = require('socket.io');
    io = io.listen(app);

var app = require('server/middlewares')(express())
    .use('/', express.static(path.join(__dirname, '.build/client')));
//**********************************************************************//

//Build Express app itself (loads & runs a constructor module), serves over web
require('server/rest-api')(app) // server
    .listen(config.server.port, function() {
        log.info('Server running: http://127.0.0.1:' +
                 config.server.port + '/');
        log.info('Server process id (pid): ' + process.pid);
        return log.info('Wow. So server. Very running. Much bootup success. Such win.');
    });