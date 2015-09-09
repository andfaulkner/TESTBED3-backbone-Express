(function page2js(Backbone, _, Store, $) {

    //___________________________________________________________________________//
    //---------------------------  BACKBONE MODEL  ------------------------------//
    //
    // The app's interactive data & logic surrounding it: e.g.
    //      data validation
    //      getters
    //      setters
    //      default values
    //      data initialization
    //      conversions
    //      ...etc.
    //

    //create namespace for app
    // var AppClass = {};

    //Instances of models, collections, views go on here
    // var app = {
    //     model : { },
    //     coll: { },
    //     view: { }
    // };
    //
    var app = {};

    app.Todo = Backbone.Model.extend({

        //Default data goes in here. If no attributes are given when the model is
        //instantiated, these are the values that it gets.
        'defaults': {
            'title': 'DEFAULT',
            'completed': false,

            //Functions can be run in models, to dynamically generate values
            //This becomes extremely useful once databases get involved.
            'created': (function() {
                return Date() + ' IS THE DATE AND TIME!';
            }())
        }
    });

    //********** TESTING DEFINED BACKBONE MODEL **********//
    //INSTANTIATES THE MODEL
    var todo = new app.Todo({
        title: 'Lisa poops on things',
        completed: false
    });

    //You can now reference the data in the model via the instantiated model
    console.log(todo.get('title'));

    //models are dynamic - you can add & remove values at runtime, whether they were
    //part of the initial model or not.
    todo.set('created_at', Date());
    console.log(todo.get('created_at')); // --> "Tue Sep 08 2015 21:56:23 GMT-0400 (EDT)"

    //INSTANTIATES THE MODEL AGAIN. You can have any number of instances of a model
    var todo2 = new app.Todo();

    // displays the default title, since none was given
    console.log(todo2.get('title')); //--> DEFAULT
    console.log(todo2.get('created'));
    //****************************************************//

    //-------------------------- END BACKBONE MODEL -----------------------------//
    //___________________________________________________________________________//


    //___________________________________________________________________________//
    //------------------------  BACKBONE COLLECTION  ----------------------------//
    //
    //Ordered sets of Models, which can:
    //---get and set Models in a collection
    //---listen for Element change events
    //---fetch Model data from the server
    //---save data (in database, file, memory, etc.)
    //
    app.TodoList = Backbone.Collection.extend({

        'model': app.Todo,

        //Stores the data. Normally done by sending it to a server backend by defining
        //a url attribute in this object e.g.:
        //  Backbone.Collection.extend({
        //      model: Todo,
        //      url: 'http://url/of/location/that/accepts/data'
        //  });
        //...but here I used localStorage to store it (using a plugin), for simplicity:
        'localStorage': new Store('backbone-todo')
    });

    //******* TESTING DEFINED BACKBONE COLLECTION ********//

    //INSTANTIATE THE COLLECTION
    app.todoList = new app.TodoList();

    //Add a model to the collection by dynamically creating a new one
    app.todoList.create({
        title: 'Lisa sometimes licks poop',
        completed: true
    });


    //Create a second model, for later addition to the collection
    var lmodel = new app.Todo({
        title: 'Lisa sometimes eats poop', completed: true
    });

    //Add second model to the collection
    app.todoList.add(lmodel);

    //Outputs all values of the given property for all models in the collection containing it
    console.log(app.todoList.pluck('title'));
    console.log(app.todoList.pluck('completed'));
    console.log(JSON.stringify(app.todoList));

    //****************************************************//
    //----------------------- END BACKBONE COLLECTION ---------------------------//
    //___________________________________________________________________________//


    //___________________________________________________________________________//
    //---------------------------  BACKBONE VIEW --------------------------------//
    app.TodoView = Backbone.View.extend({
        //'el': '#placeItem', <-- works instantly with this value - places it in one location
        'tagName': 'li',
        'template': _.template($('#item-template').html()),
        // 'initialize': function AppClassTodoView_initialize() {
        //     this.render();
        // },
        'render': function AppClassTodoView_render() {
            console.log(arguments.callee.caller.name);
            console.log('IN APPCLASS.TODOVIEW RENDER');
            // console.log('-- this.model: --');                 console.log(this.model);        console.log('-- this.model.toJSON(): --');        console.log(this.model.toJSON());
            // console.log('-- this.$el: --');                   console.log(this.$el);          console.log('-- this.$el.html: --');              console.log(this.$el.html);
            // console.log('-- this.template: --');              console.log(this.template);     console.log('-- $("#item-template").html(): --'); console.log($('#item-template').html());
            // console.log('-- _.template($("#item-template").html()): --');                     console.log(_.template($('#item-template').html()));
            // console.log('-- this.$el.html(this.template(this.model.toJSON())): --');          console.log(this.$el.html(this.template(this.model.toJSON())));
            // console.log('-- (this.$el.html(this.template(this.model.toJSON())).html()): --'); console.log((this.$el.html(this.template(this.model.toJSON()))).html());
            // CONFIRMED --> THE TEMPLATE REPLACEMENT OCCURS

            this.$el.html(this.template(this.model.toJSON()));
            return this; // enable chained calls
        }
    });

    console.log('todo:'); console.log(todo);

    var view = new app.TodoView({
        model: todo    // it is unsafe to store instantiated models on the "AppClass" object
    });

    console.log('new view:'); console.log(view);
    //-------------------------- END BACKBONE VIEW ------------------------------//
    //___________________________________________________________________________//


    //___________________________________________________________________________//
    //---------------------------  BACKBONE EVENTS --------------------------------//

    //----- GENERIC EVENT ATTACHED TO VIEW -----//
    // attach event to view
    view.on('event1', function(){
        console.log('event1 occurred!');
    });

    //trigger event
    view.trigger('event1');
    //-------------------------------------------//

    //------- GENERIC EVENT ATTACHED TO ARBITRARY OBJECT -------//
    var arbitraryObject= {};

    //Give event capabilities to arbitrary object
    _.extend(arbitraryObject, Backbone.Events);

    //Attach event to arbitrary object
    arbitraryObject.on('eventBoundToArbitraryObject1', function(){
        console.log('eventBoundToArbitraryObject1 occurred!');
    });

    //Trigger arbitrary event
    arbitraryObject.trigger('eventBoundToArbitraryObject1');
    //----------------------------------------------------------//

    //------------------------- END BACKBONE EVENTS -----------------------------//
    //___________________________________________________________________________//


    //___________________________________________________________________________//
    //--------------------------- BACKBONE MAIN VIEW -------------------------------//
    var AppView = Backbone.View.extend({

        el: '#todoapp',

        initialize: function AppView_initialize(){
            this.input = this.$('#new-todo');

            //defines events; fns run by events elsewhere in this View
            app.todoList.on('add', this.addOne, this);
            app.todoList.on('reset', this.addAll, this);

            //Load list from local storage
            app.todoList.fetch();
        },

        events: {
            'keypress #new-todo': 'createTodoOnEnter'
        },

        createToDoOnEnter: function AppView_createToDoOnEnter(e){
            if (e.which !== 13 || !this.input.val().trim() ) { // CHECK FOR ENTER KEY PRESSED
                return;
            }
            app.todoList.create(this.newAttributes());
            this.input.val(''); //clean input box ?
        },

        addOne: function AppView_addOne(todo){
            console.log('ADDONE: todo param:: '); console.log(todo);
            var view = new app.TodoView({model: todo});
            $('#todo-list').append(view.render().el);
        },

        addAll: function AppView_addAll(){
            this.$('#todo-list').html(''); //clean the todo list (erase all existing)
            app.todoList.each(this.addOne, this);
        },

        newAttributes: function AppView_newAttributes(){
            return {
                title: this.input.val().trim(),
                completed: false
            };
        }
    });

    var appView = new AppView();

    //------------------------- END BACKBONE MAIN VIEW -----------------------------//
    //___________________________________________________________________________//
    //
}(Backbone, _, Store, $));


//Collection class:            appClass.TodoListColl
//        instance:            todoListColl
//Model      class:            appClass.TodoModel
//        instance:            todoModel
//        instance:            todoModel2
//View class:                  appClass.TodoView