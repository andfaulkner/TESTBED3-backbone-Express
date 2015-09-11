/**
 * LAUNCH EXPRESSJS SERVER FROM HERE.
 */
require('rootpath')();
var http = require('http');
http.globalAgent.maxSockets = Infinity;

//ECMA 6 POLYFILL
require('harmonize')(); // ensure es6 works
require('babel/register');
Object.getPrototypeOf.toString = function() {
    return Object.toString();
};


if (process.env.NODE_ENV !== 'production') {
    Error.stackTraceLimit = Infinity;
    require('trace'); // active long stack trace
    require('clarify'); // Exclude node internal calls from the stack
}

require('./server/uncaught-error-handler');

var path = require('path');

var config = require('config/default');
var log = require('server/winston-logger');

//******************************* SERVER *******************************//
var express = require('express');

var app = express()
    .use('/', express.static(path.join(__dirname, 'public')))
    .use('/api', require('server/RESTful'));
//**********************************************************************//

//Build Express app itself (loads & runs a constructor module), serves over web
app.listen(config.server.port, function() {
    return log.info('example app listening! Bootup done!'); // server
});