console.log($);

(function($){
    console.log($);


}($.noConflict()))

console.log('entered indexjs!');
var AppView = Backbone.View.extend({
    el: '#container',
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html('Hello World!');
    }
});
console.log('reached bottom of indexjs!');
console.log(Backbone);