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

    'winstonLogs': {
        exitOnError: false,
        consoleLogLevel: 'warn',
        senecaLogLevel: 'warn',
    }
};
