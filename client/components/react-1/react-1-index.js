/* global $, _, React, async, Backbone */
'use strict';

var react1Index = require('./react-1-index.jsx');

console.log(react1Index);

$('#myTempTestForm').submit(function(e){
    e.preventDefault();
    $.post($(this)[0].action, {
            bearType: $('[name="bearType"]').val(),
            bearFood: $('[name="bearFood"]').val()
        }, function(data, textStatus, xhr) {
            console.log(data);
    });
});