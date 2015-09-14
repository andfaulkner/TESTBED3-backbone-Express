/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	(function(Backbone, _){
	    console.log('entered indexjs closure!');

	    //---------------------------  BACKBONE VIEW  -------------------------------//
	    //
	    // Mediator between the Model and the user. Populates HTML elements with data
	    // from the Model. Updates the Model in response to user-inputted data. Updates
	    // data in HTML elements when data in the Model changes (e.g. due to changes on
	    // the server, or changes in other HTML elements on the same page). A View processes
	    // data, links it to templates, & renders HTML based on events or data changes.
	    //
	    var AppView = Backbone.View.extend({

	        //Element handled by this BBView - can be any selector. Must be property "el" though.
	        el: '#container',

	        // template which has the placeholder 'who' to be substituted later
	        template: _.template('<h3>Hello <%= who %></h3>'),

	        //Runs immediately on instantiating this BBView. 1st fn called.
	        initialize: function() {
	            this.render();
	        },

	        //$el: a cached jQuery object (el), in which you can use jQuery fns
	        //     to push content (content === 'Hello World!' in this case)
	        //render: Run via 'initialize' method above (via this.render() call).
	        //Render injects the markup into the elements i.e. renders the View; i.e. Displays the BBView.
	        //It doesn't have to be a template here - it can be e.g. a string or html element).
	        render: function() {
	        // Renders the function using substituting the varible 'who' for 'Meeka!'
	            this.$el.html(this.template({who: 'Meeka!'}));
	        }
	    });

	    // INSTANTIATES THE VIEW
	    var appView = new AppView();
	//--------------------------- END BACKBONE VIEW -----------------------------//
	//___________________________________________________________________________//

	    console.log('reached bottom of indexjs!');
	}(Backbone, _));

/***/ }
/******/ ]);