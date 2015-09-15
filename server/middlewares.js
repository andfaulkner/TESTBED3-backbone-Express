//
// GLOBAL MIDDLEWARES DEFINED HERE
//

var favicon = require('serve-favicon');

// bodyParser will let us get the data from a POST
var bodyParser = require('body-parser');


module.exports = function middlewaresModule(app){
    return app
        .use(favicon('client/favicon.ico'))
        .use(bodyParser.urlencoded({ extended: true }))
        .use(bodyParser.json());
};