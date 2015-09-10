//inline config
/* jshint undef: true, unused: true */

//Force strict mode
/* jshint strict: true */

//Define global objects in here:
/* globals MY_GLOBAL */

//Blacklist global variable
/* globals -BAD_LIB */

//Tell JSHint about global variables that are defined in the current file but used elsewhere
/* exported EXPORTED_LIB */

//
//Tell JSHint to ignore a block of code
//
/* jshint ignore:start */
// Code here will be ignored by JSHint.
/* jshint ignore:end */


//Change rules the for block that immediately follows
/*jshint unused:true, eqnull:true */

//Block warning by code emitted
/* jshint -W034 */

//Re-enable blocked warning
/* jshint +W034 */