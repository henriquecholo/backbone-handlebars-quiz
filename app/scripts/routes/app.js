/*global define*/

define([
    'jquery',
    'backbone',
    'emailView',
    'resultView',
    'quizView'
], function ($, Backbone, EmailView, ResultView, QuizView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'quizz': 'quizz',
            'result' : 'result'
        },
        index: function () {
            new EmailView;
            $('#quiz').hide();
            $('#result').hide();
            $('#email').show();
        },
        quizz: function () {
            new QuizView;
            $('#email').hide();
            $('#result').hide();
            $('#quiz').show();
        },
        result: function () {
            new ResultView;
            $('#email').hide();
            $('#result').show();
            $('#quiz').hide();
        }

    });

    return AppRouter;
});
