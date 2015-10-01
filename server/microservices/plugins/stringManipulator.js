process.stdin.resume();

(function(){

var log     = require('app/helpers/winston-logger').seneca, //Logging
    _       = require('lodash'),
    colors  = require('colors');


log.info('****** enters stringManipulator.js ******'.bgYellow.black);


//--------------------------------------------------------------------------------//
//******************************* @EXPORT - MODULE *******************************//
var stringManipulator = function stringManipulator(opt) {

    if (opt.debug === true) log.info('in stringManipulator fn'.bgYellow.black);


    /**
     * INITIALIZATION FUNCTION // {{{ OPTIONAL }}}
     */
    var init = function init(msg, respond){
        if (opt.debug === true) log.info('stringManipulator.js DEBUG MODE ON');
        log.info('stringManipulator initialized!'.bgYellow.black);
        return respond();
    };


    //******************** ACTION FUNCTIONS *********************//
    var fn1 = ((msg, respond) =>
        (respond(null, { answer: msg })));

    var fn2 = function fn2(msg, respond){
        return respond(null, { answer: msg });
    };
    //**********************************************************//


    //ADD ACTION FUNCTIONS TO SENECA
    this.add('init:stringManipulator', init) //special initialization pattern {{{ OPTIONAL }}}
        .add('role:stringManipulator,cmd:fn1', fn1)
        .add('role:stringManipulator,cmd:fn1', fn2)
        // .listen({ port:12346, host:'localhost' });

    //RUNS PRIOR TO EACH ACTION FN CALL  {{{ OPTIONAL }}}
    this.wrap('role:stringManipulator', function(msg, respond) {
        if (opt.debug === true) log.info('in stringManipulator wrap!');
        return (this.prior(_.merge(msg,
                                   { serviceName: "stringManipulator" }),
                           respond));
    });
};
//********************************************************************************//
//--------------------------------------------------------------------------------//


// FOR DEBUGGING - ONLY RUN IF PLUGIN FROM CLI & 'launch' PARAM PASSED IN
(((stringManipulator) => {
    return ((process.argv.some( (arg) => (arg === 'launch') ) === true) ?
        require('seneca')()
            .use(stringManipulator, { debug: true })
            .act('role:stringManipulator,cmd:fn1', log.info) :  //test action
        null)
})(stringManipulator));


//Export occurs here
module.exports = stringManipulator;

}());




// //NODE MODULES
// var log = require('app/helpers/winston-logger').seneca; //Logging
// var _ = require('lodash');
// var colors = require('colors');

// log.info('****** enters stringManipulator module ******'.bgYellow.black);

// //--------------------------------------------------------------------------------//
// //******************************* @EXPORT - MODULE *******************************//
// /**
//  * A series of services that manipulate strings they are passed
//  * @param  {Object} options:
//  *            - debug {Boolean} - if true, emit extra logs
//  * @return {[type]}         [description]
//  */
// var stringManipulator = function stringManipulator(options) {

//     log.info('****** enters stringManipulator EXPORT ******'.bgYellow.black);

//     log.debug(options);

//     if (options.debug === true) log.info('****** enters stringManipulator ******'.bgYellow.black);


//     //INITIALIZER - RUNS WHEN stringManipulator REQUIRE'D
//     var init = ((msg, respond) => {
//         if (options.debug === true) log.info('*stringManipulator DEBUG MODE ON*');
//         log.info('stringManipulator initializing!');
//         return respond();
//     });


//     //******************** ACTION FUNCTIONS *********************//
//     //Action function 1
//     var fn1 = ((msg, respond) =>
//         (respond(null, { answer: "theAnswer"})));   //[[NONISSUE]]

//     //Action function 2
//     // var fn2 = ((msg, respond) => {
//     //     respond(null, { answer: "theAnswer"});
//     // });
//     //**********************************************************//


//     //ADD ACTION FUNCTIONS TO SENECA
//     this.add('init:stringManipulator', init); //the special initialization pattern
//     this.add('role:stringManipulator,cmd:fn1', fn1);
//         // .add('role:stringManipulator,cmd:fn1', fn2);


//     //RUNS PRIOR TO EACH ACTION FN CALL
//     this.wrap('role:stringManipulator', function(msg, respond) {
//         if (options.debug === true) log.info('in stringManipulator wrap!');
//         //Standard pre-action-function actions here - done on msg
//         this.prior(msg, respond);
//     });

// }
// //********************************************************************************//
// //--------------------------------------------------------------------------------//


// // FOR DEBUGGING - ONLY RUN IF PLUGIN FROM CLI & 'launch' PARAM PASSED IN
// (function(stringManipulator){
//     log.info('****** enters stringManipulator DEBUG BLOCK ******'.bgYellow.black);
//     return (process.argv.some(function(arg){
//                 return (arg === 'launch') ? true : false;
//              }) === true) ?
//         require('seneca')()
//             .use(stringManipulator, { debug: true }) :
//             // .act('role:stringManipulator,cmd:fn1', log.info) : //[[NONISSUE]]
//         null;
// }(stringManipulator));


// //Export occurs here
// module.exports = stringManipulator;