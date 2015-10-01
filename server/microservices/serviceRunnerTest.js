//Logger
var log = require('app/helpers/winston-logger').seneca;

var superlog = ((err, result) =>
    ((err) ? log.error(err) : log.info(result)));

log.info('entered serviceRunnerTest.js');


module.exports = ((seneca) =>
    (seneca.act('role:math,cmd:sum,' + 'left:1, right:2', superlog)
           .act('role:math,cmd:multiply,' + 'left:5, right: 4', superlog)
           .act('role:math,cmd:subtract,' + 'left:20,right:5', superlog)
           .act('role:math,cmd:sum,' + 'left:4,right:211', superlog )));