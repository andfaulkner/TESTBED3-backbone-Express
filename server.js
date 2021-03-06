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
Object.getPrototypeOf.toString = function objToStringPolyfill() {
    return Object.toString();
};
//********************************************************************//

//***************************** NODE MODULES *****************************//
var seneca = require('seneca')();

//**************************** ERROR HANDLING ****************************//
if (process.env.NODE_ENV !== 'production') {
    Error.stackTraceLimit = Infinity;
    require('trace'); // active long stack trace
    require('clarify'); // Exclude node internal calls from the stack
}

var log = require('server/debug/winston-logger');
require('server/debug/uncaught-error-handler');
//********************************************************************//

//************************* SENECA TESTS *************************//
//register Seneca client to communicate w microservices, try some actions w it
seneca.client({ port:11111, host:'localhost', type:'tcp' })

      //Perform math actions
      .act( 'role:math,cmd:sum,' + 'left:123,right:27',
            log.seneca.info)
      .act('role:math,cmd:multiply,' + 'left:10,right:5',
           log.seneca.info);
//****************************************************************//

//get router
var restAPIRouter = require('server/routes/todo-restapi-routes');

//******************************* SERVER *******************************//
var express = require('express');

var app = require('server/middlewares')(express())
    .use('/', express.static(path.join(__dirname, '.build/client')))
    .use('/api', restAPIRouter);
//**********************************************************************//

//Build Express app itself (loads & runs a constructor module), serves over web
require('socket.io').listen(require('server/rest-api')(app) // server
    .listen(config.server.port, function startServer() {
        log.info('Server running: http://127.0.0.1:' +
                 config.server.port + '/');
        log.info('Server process id (pid): ' + process.pid);
        return log.info('Wow. So server. Very running. Much bootup success. Such win.');
    }));
