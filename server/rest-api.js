//
// REST API SETUP (prior to defining routes)
// TODO THIS WHOLE THING IS BARELY STARTED

var log = require('server/debug/winston-logger');
var config = require('config/default');

// var Redis = require('redis');

// // Create the publish & subscribe clients for redis to send to the `backbone-redis` module
// var db  = Redis.createClient(config.redis.port, config.redis.host, config.redis.options),
//     pub = Redis.createClient(config.redis.port, config.redis.host, config.redis.options),
//     sub = Redis.createClient(config.redis.port, config.redis.host, config.redis.options);


module.exports = function restAPIModule(app) {
    app.use('/api', require('server/routes/todo-restapi-routes'));
    return app;
};