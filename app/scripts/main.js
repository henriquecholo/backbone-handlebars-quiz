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
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        handlebars: '../bower_components/handlebars/handlebars',
        localStorage: "../bower_components/backbone.localStorage/backbone.localStorage",
        emailView: "views/email",
        emailModel: "models/email",
        quizView: "views/quiz",
        quizModel: "models/quiz",
        quizCollection: "collections/quiz"
    }
});

require([
    'backbone',
    'emailView'
], function (Backbone, EmailView) {
    Backbone.history.start();
    new EmailView;
});

