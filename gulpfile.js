require('harmonize')(); // ensure es6 works
//console.log(Error.stackTraceLimit);
//console.dir(process, {showHidden: true, depth: 20, colors: true });
//console.dir(process.execArgv, {showHidden: true, depth: 20, colors: true });
//console.dir(process.env);
//console.log(process.version);
//console.dir(process.config, {showHidden: true, depth: 20, colors: true });

var gulp = require('gulp');

require('colors');

//NODE MODULES & JS LIBRARIES
var path    = require('path'),
    fs      = require('fs-extra'),
    yargs   = require('yargs'),
    merge   = require('merge2'),
    _       = require('lodash'),
    del     = require('del'),
    async   = require('async');

require('shelljs/global');

//ECMA 6 POLYFILL
require('babel/register');
Object.getPrototypeOf.toString = (() => (Object.toString()));

var nodemonConfig = require('configs/nodemon.json');

//------------------------------- PLUGINS --------------------------------//
//PACKAGED GULP PLUGINS --- AVAILABLE VIA 'p.nameOfPackage'
var p = require('gulp-packages')(gulp, [
    'autoprefixer',             // prefix css for multiple browsers
    'babel',                    // compile ECMA6 --> ECMA5
    'debug',                    // lists all files run thru it
    'dev',                      // Toggle html comments on & off
    'display-help',             // Display help file
    'dust',                     // Compile Dust templates
    'express',                  // Launch express framework
    'exit',                     // Force quit Gulp process
    'filter',                   // Filter out unwanted files from stream
    'if-else',                  // if-else statements mid-stream
    'jshint',                   // display Javascript errors
    'newer',                    // Only push item through pipe if newer
    'livereload',               // Relaunch in browser automatically
    'nodemon',                  // Keep server running - restart on crash
    'notify',                   // Tells you if a reload happens
    'plumber',                  // keep running if error occurs
    'print',                    // output errors to console
    'rename',                   // Rename files
    'replace',                  // find-and-replace text in files
    'requirejs-optimize',
    'rimraf',                   // remove files
    'sass',                     // compile scss and sass --> css
    'shell',                    // run shell commands with gulp
    'size',                     // output file size
    'sourcemaps',               // link up precompile and postcompile code
    'stats',                    // provides stats on files passed thru stream
    'sweetjs',                  // expand macros
    'tap',                      // run function mid-stream
    'webpack'                   // compile webpack
]);

//UNPACKAGEABLE GULP PLUGINS
var gutil = require('gulp-util');
var lazypipe = require('lazypipe');
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var wait = require('gulp-wait');
//------------------------------------------------------------------------//

//------------------------------ CONSTANTS -------------------------------//
var SRC = {
    'root': ['./app/**/*.*'],
    'static': [
        './app/**/*.*',
        '!./app/**/*.js',
        '!./app/**/*.json',
        '!./app/**/*.dust'
    ],
    'publicStatic': [
        './app/libs/**/*.*',
        '!./app/libs/**/*.js'
    ],
    'tpl': './app/**/*.dust',
    'scripts': './app/components/components'
};

var DEST = {
    'root': './.build',
    'publicStatic': './.build/public'
};
//------------------------------------------------------------------------//


//------------------ COMMAND LINE PARAMETER HANDLING ---------------------//
//Command line flags accepted by gulp
var cmds = ['test', 'production', 'stats', 'once'];

/**
 * Populate args object w/ command line args, setting each that was received to
  * true in the args object, & all others to false. Referenced by argument name.
  * @example args.production set to true if gulp launched w/ gulp --production.
  */
var args = (function populateArgs(argList, argObj){
    argList.forEach(function createArgObjFromArgArray(arg){
        argObj[arg] = (yargs.argv[arg] === true);
    });
    return argObj;
}(cmds, {}));
//------------------------------------------------------------------------//

//------------------------------ UTILITIES ------------------------------//
/**
 * Output webpack errors when caught.
 */
var onError = function onError(err) {
    gutil.beep();
    console.log(gutil.colors.red.bgWhite('-----------------------------------'));
    console.log('ERROR OCCURRED');
    console.log(typeof err);
    console.log(gutil.colors.red.bgWhite(err.toString()));
    console.log(gutil.colors.red.bgWhite('-----------------------------------'));
    this.emit('restart');
    this.emit('end');
};

var fileExists = function fileExists(filePath, callback){
    fs.stat(filePath, (err, stats) => {
        if (err) return callback(false);
        return callback(stats.isFile());
    });
}

//------------------------------------------------------------------------//


//################################################################################
//#~~~~~~~~~~~~~~~~~~~~~~~~~~~ REUSABLE PIPE COMPONENTS ~~~~~~~~~~~~~~~~~~~~~~~~~~
//################################################################################
var catchErrors = lazypipe()
    .pipe(p.plumber, { errorHandler: onError });

var consoleTaskReport = lazypipe()
    .pipe(catchErrors)
    .pipe(p.print);

var newerThanRootIfNotProduction = lazypipe()
    .pipe(p.ifElse, !args.production, p.newer.bind(this, DEST));


//
// Lightweight templates for removing debug code when production flag set
//
// Removes single-line sections of javascript bookended by: /*<%*/  and  /*%>*/
// E.g.  /*<%*/ console.log('this line of JS gets removed'); /*%>*/
// Removes multiline js blocks bookended by: /*<{{DEBUG*/  and  /*DEBUG}}>*/
//                                    ...OR: /*<{{TEST*/   and   /*TEST}}>*/
//
var rmDebugCode = lazypipe()
    .pipe(p.ifElse, !!args.production,
        p.replace.bind(this, /\/\*<\%.*\%\>\*\//g, ''))
    .pipe(p.ifElse, !!args.production,
        p.replace.bind(this, /\/\*<\{\{DEBUG\*\/[\s\S]*?\/\*DEBUG\}\}\>\*\//gm, ''))
    .pipe(p.ifElse, !!args.production,
        p.replace.bind(this, /\/\*<\{\{TEST\*\/[\s\S]*?\/\*TEST\}\}\>\*\//gm, ''));
//#################################################################################

//################################################################################
//#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ LIST ALL GULP TASKS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//################################################################################
gulp.task('get-tasks', () =>
    (process.nextTick(() => {
        console.log('\n_________ALL REGISTERED GULP TASKS_________');
        Object.keys(gulp.tasks).forEach((t) =>
            ((t === 'install' || t === 'uninstall') ?
                null :
                console.log('-- ' + t.bgBlack.green)));
        console.log('___________________________________________\n');
    })));
//#################################################################################


//################################################################################
//#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ LIVERELOAD SERVER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//################################################################################
gulp.task('server', function livereloadServer(){
    livereload.listen();                    // listen for changes
    return consoleTaskReport()
        .pipe(p.nodemon(nodemonConfig)
            .on('restart', () => {
               livereload.listen();
               return gulp.src('app/server.js')   // when the app restarts, run livereload.
                    .pipe(consoleTaskReport())
                    .pipe(p.tap(() => {
                        console.log('\n' + gutil.colors.white.bold.bgGreen('\n' +
                        '     .......... RELOADING PAGE, PLEASE WAIT ..........\n'));
                    }))
                    .pipe(notify({message: 'RELOADING PAGE, PLEASE WAIT', onLast: true}))
                    .pipe(wait(1500))
                    .pipe(livereload());
        }));

    });
//################################################################################

gulp.task('webpack', function(){
    return gulp.src(SRC.root)
        .pipe(p.webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(DEST.root))
        .pipe(notify({
            onLast: true,
            message: 'WEBPACKING COMPLETED'
        }));
    });

gulp.task('dust', function(){
    return gulp.src(SRC.tpl)
        .pipe(p.dust({
            name: (file) => {
                var basename = path.basename(file.relative);
                return basename.substring(0, basename.lastIndexOf('.'));
            }
        }))
        .pipe(gulp.dest(DEST.root))
        .pipe(notify({
            onLast: true,
            message: 'DUST Compiled'
        }));
    });


gulp.task('copy-static', function(){
    return gulp.src(SRC.publicStatic)
        .pipe(gulp.dest(DEST.publicStatic))
        .pipe(notify({
            onLast: true,
            message: 'STATIC ASSETS COPIED'
        }));
});


//################################################################################
//#~~~~~~~~~~~~~~~~~ CONVERT COMMONJS LIBS TO AND FROM REQUIREJS ~~~~~~~~~~~~~~~~~~
//################################################################################

//################################################################################

//gulp.task('build', ['copy-static', 'dust', 'webpack']);
gulp.task('build', ['copy-static', 'webpack']);

gulp.task('watch', () => { gulp.watch(SRC.root, ['build']); });

gulp.task('default', () => runSequence('build', 'watch') );