/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        localStorage: {
            deps: ['backbone'],
            exports: 'LocalStorage'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        handlebars: {
            exports: 'handlebars'
        },
        hbs: {
            deps: ['handlebars'],
            exports: 'hbs'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        handlebars: '../bower_components/handlebars',
        hbs: "../bower_components/hbs",
        localStorage: "../bower_components/backbone.localStorage"
    }
});

require([
    'backbone'
], function (Backbone) {
    Backbone.history.start();
});
