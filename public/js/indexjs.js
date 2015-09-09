(function(){
    console.log('entered indexjs closure!');

    var AppView = Backbone.View.extend({

        //Element handled by this BBView - can be any selector. Must be property "el" though.
        el: '#container',

        // template which has the placeholder 'who' to be substituted later
        template: _.template('<h3>Hello <%= who %></h3>'),

        //Runs immediately on instantiating this BBView. 1st fn called.
        initialize: function() {
            this.render();
        },

        //Displays the BBView. $el is a cached jQuery object, into which you can use jQ
        //fns to push content (in this case, 'Hello Meeka!' gets pushed in. It doesn't
        //have to be a template that goes here - it can just be a string or an html element).
        render: function() {
            this.$el.html(this.template({who: 'Meeka!'}));
        }
    });

    var appView = new AppView();

    console.log('reached bottom of indexjs!');
}(Backbone, _));