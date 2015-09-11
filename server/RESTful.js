
//Logging
var log = require('server/winston-logger');

//Build a new router object
var restRouter = require('express').Router();

restRouter.get('/', function(req, res){
});

//Output new router object, for use by the app.
module.exports = restRouter;