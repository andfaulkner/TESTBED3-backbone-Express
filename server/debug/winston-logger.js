(function winstonLogger_module(){

    //node modules
    var fs = require('fs');
    var path = require('path');
    var winston = require('winston');
    var lodash = require('lodash');

    //Prototype modifying modules
    require('colors');
    require('string');

    //app config
    var config = require('config/default');
    var __projrootdir = config.__projrootdir;
    config = config.winstonLogs;

    //TODO FIX THIS::: DANGEROUS RACE CONDITION
    //Make a log directory if one didn't exist already
    fs.mkdir(path.join(__projrootdir, 'logs'), function mkLogsDir(err){
        return (err)
            ? err
            : 'log directory created';
    });

    //TODO this is not DRY - the filenames are declared twice
    var logFileNames = ['excessive-data-log.log', 'all-logs.log', 'console-log-record.log'];

    //***************************** UTILITIES *****************************//
    //Asynchronously check if a file exists
    //TODO Make part of a utilities module
    var fileExists = function fileExists(filePath, callback) {
        return fs.stat(filePath, function finalFileExistCheck(err, stats) {
            return (err)
                ? callback(false)
                : callback(stats.isFile());
        });
    };
    //*********************************************************************//


    //*************************** BASIC LOGGERS ***************************//
    //Creates logging object
    var logger = function logger(loggerTypeLabel, consoleLogLevel){

        /*eslint complexity: 0*/
        var timeStamp = function timeStamp() {
            var date = new Date(Date.now());
            var mon = (date.getMonth() > 9) ? date.getMonth() : '0' + date.getMonth(),
                dtOfMon = (date.getDate() > 9) ? date.getDate() : '0' + date.getDate(),
                hr = (date.getHours() > 9) ? date.getHours() : '0' + date.getHours(),
                min = (date.getMinutes() > 9) ? date.getMinutes() : '0' + date.getMinutes(),
                sec = (date.getSeconds() > 9) ? date.getSeconds() : '0' + date.getSeconds();

            return ('|' + mon + '/' + dtOfMon + '--' + hr + ':' + min + ':' + sec + '|').gray.bold;
        };

        //Builds transports into specific files
        var fileTransportFactory = function fileTransportFactory(logLvl, nm, logFilePath) {
            return new (winston.transports.File)({
                label: (loggerTypeLabel || ''),
                name: nm,
                level:logLvl,
                filename: path.join(__projrootdir, 'logs', logFilePath),
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            });
        };

        return new (winston.Logger)({
            transports: [   //specify appenders here

                //DATA --> CONSOLE
                new winston.transports.Console({
                    label: (loggerTypeLabel || ''),
                    level: consoleLogLevel ,
                    timestamp: timeStamp,
                    handleExceptions: true,
                    json: false,
                    colorize: true,
                }),

                //COMPLETE (EXCESSIVE) DATA --> FILE LOG
                fileTransportFactory('silly', 'silly-log',
                                     'lvl1-excessive-data-log.log'),

                //COMPLETE (EXCESSIVE) DATA --> FILE LOG
                fileTransportFactory('debug', 'debug-log',
                                     'lvl2-debug-log.log'),

                //INFO --> FILE LOG
                fileTransportFactory('info', 'info-log',
                                     'lvl3-info-log.log'),

                //WARN --> FILE LOG
                fileTransportFactory('warn', 'warn-log',
                                     'lvl4-warn-log.log'),

                //CONSOLE --> FILE LOG
                fileTransportFactory(consoleLogLevel, 'console-log',
                                     'console-log-record.log')
            ],

            exitOnError: config.exitOnError
        });
    };
    //*********************************************************************//


    //***************************** EXPORTS ******************************//
    module.exports = logger('', config.consoleLogLevel);

    module.exports.seneca = logger('seneca'.bgBlack.green.bold, config.senecaLogLevel);

    module.exports.stream = {
        write: function write(message, encoding) {
            logger().info(message);
        }
    };

    module.exports.cli = {
        dir: function dir(obj, depth){
            return console.dir(obj, { depth: (depth || 5), colors: true });
        },
        title: function title(str, lpadStr){
            return logger().log( 'info',
                '\n' +  (lpadStr || '') +
                str.capitalize().underline.bgYellow.black + '\n' );
        }
    };
    //********************************************************************//

}());