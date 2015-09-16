//Build a new router object
var Busboy = require('busboy');
var log = require('server/debug/winston-logger');

var express = require('express');
var restRouter = express.Router();

//**************************** RESTAPI ROUTES ****************************//
restRouter
    .get('/', function restRouter_base_get(req, res){
        res.json({apiAccessed: true, protocol: 'GET', msg: 'welcome to our api!'});
        res.end();
    })
    .post('/', function restRouter_base_post(req, res){
        res.json({apiAccessed: true, protocol: 'POST', msg: 'welcome to our api!'});
        res.end();
    });

// restRouter
    // .get('/2', function(req, res){

    //     res.json({apiAccessed: true, protocol: "POST", msg: 'welcome to our api - 2!'});
    //     res.end();
    // });

restRouter
    .post('/bears', function restAPIRouteBears(req, res){
        res.json({apiAccessed: true, protocol: 'POST', msg: 'welcome to our api - 2!'});
        res.end();
    });
//************************************************************************//

//Output new router object, for use by the app.
module.exports = restRouter;