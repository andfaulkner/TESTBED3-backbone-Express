'use strict';

import { createStore } from 'redux';
// var redux = require('redux');
// var createStore = require('redux').createStore;
// require('redux');

// import { zip } from 'lodash';

// console.log(redux);
// console.log(createStore());
console.log(createStore);

//ACTIONS
const actions = {
    one: {
        type: 'ADD_TODO',
        text: 'Build my first Redux app'
    },
    two: {
        type: 'COMPLETE_TODO',
        index: 5
    },
    three: {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'SHOW_COMPLETED'
    }
};


/**
 * ACTION TYPES
 */
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';


/**
 * ACTION CONSTANTS
 * @type {Object}
 */
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/**
 * ACTION CREATORS
 * @param {String} text
 */
export function addTodo(text){
    return { type: ADD_TODO, text };
};

export function completeTodo(text){
    return { type: COMPLETE_TODO, text };
};

// @param filter === one of the VisibilityFilters obj's values
export function setVisibilityFilter(filter){
    return { type: SET_VISIBILITY_FILTER, filter };
};



// var addTodo = function addTodo(text){
//     let newItem = 'text';
//     console.log(newItem);
//     return {
//         type: 'REMOVE_TODO',
//     };
// };
