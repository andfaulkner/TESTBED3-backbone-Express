var log = require('app/helpers/winston-logger').seneca; //Logging

// function minimal_plugin(options){
//     return log.info(options);
// }

require('seneca')()
    .use(((options) => (log.info(options))),
         {foo:'bar'} );