var http = require('http');
http.globalAgent.maxSockets = Infinity;

if (process.env.NODE_ENV !== 'production'){
    Error.stackTraceLimit = Infinity;
    require('trace'); // active long stack trace
    require('clarify'); // Exclude node internal calls from the stack
}

require('./server/uncaught-error-handler');

var path = require('path');

var config = require('./config/default.js');
var log = require('./server/winston-logger.js');

//******************************* SERVER *******************************//
var express = require('express');

var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
//**********************************************************************//

//Build Express app itself (loads & runs a constructor module), serves over web
app.listen(config.server.port, (function(){
        return log.info('example app listening! Bootup done!'); // server
}));
