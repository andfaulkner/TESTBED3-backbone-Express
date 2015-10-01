(function(){

var log     = require('app/helpers/winston-logger').seneca, //Logging
    _       = require('lodash'),
    colors  = require('colors');


log.info('****** enters newService.js ******'.bgYellow.black);


//--------------------------------------------------------------------------------//
//******************************* @EXPORT - MODULE *******************************//
var newService = function newService(opt) {

    if (opt.debug === true) log.info('in newService fn'.bgYellow.black);


    /**
     * INITIALIZATION FUNCTION // {{{ OPTIONAL }}}
     */
    var init = function init(msg, respond){
        if (opt.debug === true) log.info('newService.js DEBUG MODE ON');
        log.info('newService initialized!'.bgYellow.black);
        return respond();
    };


    //******************** ACTION FUNCTIONS *********************//
    var fn1 = ((msg, respond) =>
        (respond(null, { answer: msg })));

    var fn2 = function fn2(msg, respond){
        log.info('in fn2!');
        return respond(null, { answer: msg });
    };
    //**********************************************************//


    //ADD ACTION FUNCTIONS TO SENECA
    this.add('init:newService', init) //special initialization pattern {{{ OPTIONAL }}}
        .add('role:newService,cmd:fn1', fn1)
        .add('role:newService,cmd:fn1', fn2)
        // .listen();  // {{{ OPTIONAL }}}
        ;

    //RUNS PRIOR TO EACH ACTION FN CALL  {{{ OPTIONAL }}}
    this.wrap('role:newService', function(msg, respond) {
        if (opt.debug === true) log.info('in newService wrap!');
        return (this.prior(_.merge(msg,
                                   { serviceName: 'newService' }),
                           respond));
    });
};
//********************************************************************************//
//--------------------------------------------------------------------------------//


// FOR DEBUGGING - ONLY RUN IF PLUGIN FROM CLI & 'launch' PARAM PASSED IN
(((newService) => {
    return ((process.argv.some( (arg) => (arg === 'launch') ) === true) ?
        require('seneca')()
            .use(newService, { debug: true })
            .act('role:newService,cmd:fn1', log.info) :
        null);
})(newService));


//Export occurs here
module.exports = newService;

}());
