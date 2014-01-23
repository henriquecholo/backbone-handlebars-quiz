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
        quizCollection: "collections/quiz",
        resultView: "views/result",
        answerModel: "models/answer",
        answerCollection: "collections/answer",
    },
    config: {
        text: {
          useXhr: function (url, protocol, hostname, port) {
            // allow cross-domain requests
            return true;
          }
        }
    }
});

require([
    'backbone',
    'routes/app'
], function (Backbone, AppRouter) {
    new AppRouter;
    Backbone.history.start({ pushState: true });
});

