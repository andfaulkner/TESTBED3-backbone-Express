(function(){

var log     = require('app/helpers/winston-logger').seneca, //Logging
    _       = require('lodash'),
    colors  = require('colors');


log.info('****** enters web_service_test_1.js ******'.bgYellow.black);


//--------------------------------------------------------------------------------//
//******************************* @EXPORT - MODULE *******************************//
var web_service_test_1 = function web_service_test_1(opt) {

    if (opt.debug === true) log.info('in web_service_test_1 fn'.bgYellow.black);


    /**
     * INITIALIZATION FUNCTION // {{{ OPTIONAL }}}
     */
    var init = function init(msg, respond){
        if (opt.debug === true) log.info('web_service_test_1.js DEBUG MODE ON');
        log.info('web_service_test_1 initialized!'.bgYellow.black);
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
    this.add('init:web_service_test_1', init) //special initialization pattern {{{ OPTIONAL }}}
        .add('role:web_service_test_1,cmd:fn1', fn1)
        .add('role:web_service_test_1,cmd:fn1', fn2)
        // .listen({ port:12345, host:'localhost' }); // {{{ OPTIONAL }}}

    //RUNS PRIOR TO EACH ACTION FN CALL  {{{ OPTIONAL }}}
    this.wrap('role:web_service_test_1', function(msg, respond) {
        if (opt.debug === true) log.info('in web_service_test_1 wrap!');
        return (this.prior(_.merge(msg,
                                   { serviceName: 'web_service_test_1' }),
                           respond));
    });
};
//********************************************************************************//
//--------------------------------------------------------------------------------//


// FOR DEBUGGING - ONLY RUN IF PLUGIN FROM CLI & 'launch' PARAM PASSED IN
(((web_service_test_1) => {
    return ((process.argv.some( (arg) => (arg === 'launch') ) === true) ?
        require('seneca')()
            .use(web_service_test_1, { debug: true })
            .act('role:web_service_test_1,cmd:fn1', log.info) :
        null)
})(web_service_test_1));


//Export occurs here
module.exports = web_service_test_1;

}());
