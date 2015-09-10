(function(Backbone, _, $, Store, window) {
    var app = {}; // create namespace for our app

    var passes = 0;

    console.log(Backbone.sync);

    Backbone.syncOld = Backbone.sync;

    /**
     * Decorated Backbone.sync's default behaviour
     * @param  {String}                method: type of request
     * @param  {BBModel||BBCollection} model:  data obj; either model or collection
     * @param {Object} options: success and error callbacks,
     */
    Backbone.sync = function BBSyncOverride(method, model, options) {
        console.log('ENTERS BBSYNCOVERRIDE!');
        console.log(method);    // type of request
        console.log(model);
        console.log(_.pluck(model, 'title'));
        passes = passes + 1;
        console.log(passes);
        Backbone.syncOld.apply(this, arguments);
    };

    //------------------------------------------
    // Models
    //------------------------------------------
    //
    app.Todo = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false
        },

        //If item complete, marks incomplete. If item incomplete, marks complete. Saves change in state.
        toggle: function() {
            this.save({
                completed: !this.get('completed')
            });
        }
    });

    //------------------------------------------
    // Collections
    //------------------------------------------
    //
    app.TodoList = Backbone.Collection.extend({
        model: app.Todo,
        localStorage: new Store('backbone-todo')
    });

    // instance of the Collection
    app.todoList = new app.TodoList();


    //------------------------------------------
    // Views
    //------------------------------------------
    //
    /**
     * Individual todo list items (<li> items)
     */
    var TodoView = Backbone.View.extend({

        tagName: 'li',

        template: _.template($('#item-template').html()),

        initialize: function TodoView_initialize() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this); //remove: convenience BB fn to rm view from DOM
        },

        render: function TodoView_render() {
            this.$el.html(this.template(this.model.toJSON()));
            this.input = this.$('.edit'); //def this.input as <input class="edit" value=/*curVal*/>
            return this; // enable chained calls
        },

        /**
         * 'action DOMElementActionPerformedOn' : 'fnDefInThisViewToRun'
         * @type {Object<String:String>}
         */
        events: {
            'click .destroy': 'destroy',
            'dblclick label': 'edit',
            'blur .edit': 'close',
            'keypress .edit': 'updateOnEnter',
            'click .toggle': 'toggleTodoItem'
        },

        /**
         * Modifies the contents of the todo list item
         */
        edit: function TodoView_edit() {
            this.$el.addClass('editing'); //restyle element to inform user it's currently being edited
            this.input.focus(); //"select" the input box
        },

        /**
         * Destroys the model associated with this View
         */
        destroy: function TodoView_destroy() {
            this.model.destroy();
        },

        /**
         * Grabs the new value of the todo list item, from the temporary input box,
         *  and saves it to the Model associated with the specific todo list item.
         */
        close: function TodoView_close() {
            var value = this.input.val().trim();
            if (value) {
                this.model.save({
                    title: value
                });
            }
            this.$el.removeClass('editing');
        },

        /**
         * When enter is pressed while updating a todolist item value, run the close function
         * @param  {Object} e   jQuery event
         */
        updateOnEnter: function TodoView_updateOnEnter(e) {
            if (e.which === 13) { // if enter was pressed
                this.close(); //
            }
        },

        /**
         * Mark a completed todo list item complete.
         * Save the completion status of the list item to storage.
         */
        toggleTodoItem: function TodoView_toggleTodoItem() {
            console.log(this.$el); //--> entire DOM of single todo list item (<li><div class="view">...etc...</div></li>)

            //Determine what to save
            var isDone = this.$el.find('.toggle')[0].checked;
            /**/ console.log(isDone); console.log(this.model);

            //Save new val in db (true if checkbox checked, false if not). CB runs based on if save worked.
            this.model.save({ completed: isDone }, {
                success: function View_toggleTodoItemSuccess(model, response, options){
                    console.log('to-do item successfully saved!');
                },
                error: function View_toggleTodoItemError(model, response, options){
                    console.log('to-do item failed to save');
                },
            });
        }

    });


    //-----------------------------------------------------------------------//
    //**************************** MAIN APP VIEW ****************************//
    /**
     * Main todo list view - View comprising the entire Todo list
     * Renders the full list of todo items, calling TodoView for each one.
     *     -- i.e. generates individual View objects for each todo item.
     */
    app.AppView = Backbone.View.extend({

        el: '#todoapp',

        initialize: function() {
            this.input = this.$('#new-todo'); // defines input box
            app.todoList.on('add', this.addOne, this);
            app.todoList.on('reset', this.addAll, this);
            app.todoList.fetch(); // Loads list from local storage
        },

        events: {
            'keypress #new-todo': 'createTodoOnEnter'
        },

        /**
         * Add a todo list item (TodoView) to the todo list collection ()
         * @param  {Object} e  - jQuery Event object
         */
        createTodoOnEnter: function(e) {
            if (e.which !== 13 || !this.input.val().trim()) { // ENTER_KEY = 13
                return;
            }
            app.todoList.create(this.newAttributes());
            this.input.val(''); // clean input box
        },

        /**
         * Create a new todo list item (create a new TodoView object).  Bind the Model
         * given in param todo to the new TodoView. Render the new TodoView and append
         * it to the DOM element with id 'todo-list'
         *
         * @param {BBModel} todo - Backbone Model object to bind to the new TodoView object
         */
        addOne: function(todo) {
            var view = new TodoView({
                model: todo
            });
            $('#todo-list').append(view.render().el);
        },

        /**
         * Add all todo list items to the collection.
         */
        addAll: function() {
            this.$('#todo-list').html(''); // clean the todo list

            //Catches various routes - e.g. case pending runs at origin/file.html#pending
            switch (window.filter) {
                case 'pending':
                    _.each(app.todoList.remaining(), this.addOne);
                    break;
                case 'completed':
                    _.each(app.todoList.completed(), this.addOne());
                    break;
                default:
                    app.todoList.each(this.addOne, this);
                    break;
            }
        },

        newAttributes: function() {
            return {
                title: this.input.val().trim(),
                completed: false
            };
        }

    });
    //************************** END MAIN APP VIEW **************************//
    //-----------------------------------------------------------------------//


    //-----------------------------------------------------------------------//
    //******************************* ROUTER ********************************//

    app.Router = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },
        setFilter: function(params) {
            console.log('app.router.params = ' + params);
            window.filter = (params) ? (params.trim() || '') : '';
            app.todoList.trigger('reset');
        }
    });

    var accounts = new Backbone.Collection();
    accounts.url = '/accounts';
    accounts.localStorage = new Store('accounts-store');

    accounts.fetch();


    //***************************** END ROUTER ******************************//
    //-----------------------------------------------------------------------//

    //--------------
    // Initializers
    //--------------
    app.router = new app.Router();

    Backbone.history.start();
    app.appView = new app.AppView();

}(Backbone, _, $, Store, window));