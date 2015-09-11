/**
 * Exports config info, making it all available from the calling module.
 */

var path = require('path');

module.exports = {

    'appName': 'express-backbone-testbed-3',

    'server': {
        port: 3002
    },

    'client': {
        levelOfLog: 'debug'
    },

    // Redis configuration settings
    'redis': {
        port : 9999,
        host : '127.0.0.1',
        options : {
            parser : 'javascript',
            return_buffer : false
        },
    },

    'winstonLogs': {
        exitOnError: false,
        consoleLogLevel: 'warn',
        senecaLogLevel: 'warn',
    }
};
