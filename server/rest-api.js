
//Logging
var log = require('server/winston-logger');

//Configuration data
var config = require('config/default');
var redisConfig = config.redis;



module.exports = function restAPIModule(app) {
    app.use('/api', require('server/routes/todo-restapi-routes'));
    return app;
};