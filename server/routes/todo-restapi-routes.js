//Build a new router object
var restRouter = require('express').Router();

restRouter
    .get('/', function restRouter_base_get(req, res){
        res.json({apiAccessed: true, protocol: "GET", msg: 'welcome to our api!'});
        res.end();
    })
    .post('/', function restRouter_base_post(req, res){
        res.json({apiAccessed: true, protocol: "POST", msg: 'welcome to our api!'});
        res.end();
    });

restRouter
    .post('/', function(req, res){
        res.json({apiAccessed: true, protocol: "POST", msg: 'welcome to our api!'});
        res.end();
    });

restRouter
    .post('/', function(req, res){
        res.json({apiAccessed: true, protocol: "POST", msg: 'welcome to our api!'});
        res.end();
    });

//Output new router object, for use by the app.
module.exports = restRouter;