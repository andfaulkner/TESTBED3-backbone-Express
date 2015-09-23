/*global _, Backbone, $, bootstrap, React*/
require('../../client/lib/bootstrap/ie10-viewport-bug-workaround');
require('./react-stuff/page4js-react-stuff.jsx');

(function page4js_module(_){
    var bears = require('./models/modelData/bears-model-data');
    // console.log('in 4!');
    // console.log(bears);

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
    // console.log(bearCollection);
    //*************************************************************************//

    var BearView = Backbone.View.extend({

        tagName: 'textContent',
        className: 'bear-content',

        initialize: function BearView_initialize(){
            this.listenTo(this.model, 'change', this.render);
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