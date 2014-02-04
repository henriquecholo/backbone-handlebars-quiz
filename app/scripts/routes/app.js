/*global define*/

define([
    'jquery',
    'backbone',
    'controllers/email',
    'controllers/result',
    'controllers/quiz'
], function ($, Backbone, EmailController, ResultController, QuizController) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'quizz': 'quizz',
            'result' : 'result'
        },
        index: function () {
            this.render(EmailController.action());
        },
        quizz: function () {
            this.render(QuizController.action());
        },
        result: function () {
            this.render(ResultController.action());
        },

        render: function(view) {
            if (this.currentView) {
                this.currentView.remove();
            }
            if (view) {
                this.currentView = view;
                view.render();
                $('#content').html(view.el);
            }
            else {
                this.navigate('', { trigger:true });
            }
        }

    });

    return AppRouter;
});
