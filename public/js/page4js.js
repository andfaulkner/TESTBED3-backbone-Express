(function page4js_module(_){
    var bears = require('./models/modelData/bears-model-data');
    console.log("in 4!");
    console.log(bears);

    var bearModels = { };
    var bearModelInsts = { };


    var bearModel = Backbone.Model.extend({
        initialize: function initializeBear(bear){
            this.set(bear);
        }
    });

    //**************************** BEAR COLLECTION ****************************//
    var bearCollection = Backbone.Collection.extend({
        model: bearModel
    });
    //*************************************************************************//

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