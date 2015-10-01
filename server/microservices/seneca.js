//Logger
var log = require('app/helpers/winston-logger').seneca;
var senlog = ((err, result) => ((err) ? log.error(err) : log.info(result)));

//Listen for services
module.exports = ((() =>
    (require('seneca')()

        //register microservices
        .use('app/microservices/plugins/emitHello', { opt1: 'val1'})
        .use('app/microservices/plugins/math_test_1', { opt1: 'someoptval1'})
        .listen({ port:11111, host:'localhost', type:'tcp' })

        //TEST: try a string action
        .act('role:emitstr,cmd:hello', senlog)
))());