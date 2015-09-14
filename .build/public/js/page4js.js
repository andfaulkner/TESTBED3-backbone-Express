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
/***/ function(module, exports, __webpack_require__) {

	(function page4js_module(_){
	    var bears = __webpack_require__(1);
	    console.log("in 4!");
	    console.log(bears);

	    var bearModels = { };
	    var bearModelInsts = { };


	    //**************************** BEAR MODELS ****************************//
	   var BearModel = Backbone.Model.extend({
	        initialize: function initializeBear(bear){
	            this.set(bear);
	        }
	    });
	    //*********************************************************************//

	    //**************************** BEAR COLLECTION ****************************//
	    var BearCollection = Backbone.Collection.extend({
	        model: BearModel,
	        url: '/api/bears'
	    });

	    var bearCollection = new BearCollection(bears);
	    console.log(bearCollection);
	    //*************************************************************************//

	    var BearView = Backbone.View.extend({

	        tagName: 'textContent',
	        className: 'bear-content',

	        initialize: function BearView_initialize(){
	            this.listenTo(this.model, "change", this.render);
	        }
	    });




	    // _.each(bears, function(bear){

	        // //**************************** BEAR MODELS ****************************//
	        // var bearModelNm = bear.bearType + 'Model';
	        // var bearInstNm = bear.bearType + 'ModelInst';

	        // bearModels[bearModelNm] = Backbone.Model.extend({
	        //     initialize: function initializeBear(bear){
	        //         this.set(bear);
	        //         console.log('bear initialized!');
	        //         console.log(bear);
	        //     }
	        // });
	        // bearModelInsts[bearInstNm] = new bearModels[bearModelNm](bear);
	        // //********************************************************************//

	    // });
	}(_));

/***/ },
/* 1 */
/***/ function(module, exports) {

	var bearsModelData = [
	    {
	        bearType: 'Grizzly',
	        favoriteFood: 'hikers',
	        home: 'forest',
	        badassAsFuck: true
	    },
	    {
	        bearType: 'Sun',
	        favoriteFood: 'honey',
	        home: 'Asia or some shit',
	        badassAsFuck: true
	    },
	    {
	        bearType: 'Brown',
	        favoriteFood: 'berries',
	        home: 'forest',
	        badassAsFuck: true
	    },
	    {
	        bearType: 'Polar',
	        favoriteFood: 'seals and small children',
	        home: 'arctic',
	        badassAsFuck: true
	    },
	    {
	        bearType: 'not a bear',
	        favoriteFood: 'lame things',
	        home: 'somewhere lame',
	        badassAsFuck: false
	    },
	    {
	        bearType: 'Smokey',
	        favoriteFood: 'not forest fires',
	        home: 'forests not on fire',
	        badassAsFuck: false
	    }
	];

	module.exports = bearsModelData;

/***/ }
/******/ ]);