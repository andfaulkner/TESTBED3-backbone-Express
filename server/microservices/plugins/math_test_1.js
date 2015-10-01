process.stdin.resume();

var log = require('app/helpers/winston-logger').seneca; //Logging
var _ = require('lodash');

//******************************* @EXPORT - MODULE *******************************//
var math = function math(options) {

    if (options.debug === true) log.info('enters math');

    /**
     * INITIALIZATION FUNCTION
     */
    var init = function init(msg, respond){
        if (options.debug === true) log.info('** math_test_1.js HAS DEBUG MODE ON **');
        log.info('math initializing!');
        return respond();
    };

    //Subtract msg.right from msg.left
    var subtract = ((msg, respond) =>
        (respond(null, { answer: msg.left - msg.right })));

    //Multiply 2 numbers in message sent: msg.left & msg.right
    var multiply = ((msg, respond) =>
        (respond(null, { answer: msg.left * msg.right })));

    /**
     * Checks that numbers to sum are finite, runs & gets sum from parent (actual
     * summing) service, attaches initial params to sum, displays sum & info.
     */
    var sum = ((msg, respond) =>
        (respond(null, { answer: msg.left + msg.right })));

    /**
     * Checks that numbers to sum are finite, runs & gets sum from parent (actual
     * summing) service, attaches initial params to sum, displays sum & info
     */
    var sum2 = ((msg, respond) =>
        (!Number.isFinite(msg.left) || !Number.isFinite(msg.right))
            ? (respond(new Error('Expected left & right to be numbers')))
            : (this.prior({ role: 'math',     cmd: 'sum',
                          left: msg.left,   right: msg.right},
                        ((err, result) =>
                          ((err)
                            ? respond(err)
                            : (respond(null,
                                       _.merge({ info: msg.left + '+' + msg.right },
                                               result))))))));


    this.add('init:math', init); //the special initialization pattern
    this.add('role:math,cmd:sum', sum)
        .add('role:math,cmd:sum2', sum2)
        .add('role:math,cmd:multiply', multiply)
        .add('role:math,cmd:subtract', subtract);
        // .listen({ port:12345, host:'localhost' });


    /**
     * Initialization fn run before any other role:math action fn
     */
    this.wrap('role:math', function(msg, respond) {
        if (options.debug === true) log.info('in math_test_1 wrap!');
        msg.left = Number(msg.left).valueOf();
        msg.right = Number(msg.right).valueOf();
        this.prior(msg, respond);
    });
};
//********************************************************************************//

// // FOR DEBUGGING - ONLY RUN IF PLUGIN FROM CLI & 'launch' PARAM PASSED IN
(((math) =>
    (process.argv.some( (arg) => (arg === 'launch') ) === true)
        ? require('seneca')()
            .use(math, { debug: true })
            .act('role:math,cmd:multiply,left:10,right:22', log.info)
        : null)  //test action
(math));

module.exports = math;