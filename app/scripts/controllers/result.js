/*global define*/
define(['answerCollection','resultView', 'backbone'],
    function (AnswerCollection, ResultView, Backbone) {
        'use strict';

        var ResultController = {
            action: function() {
                var quizCollection  = new Backbone.LocalStorage('QuizCollection'),
                    answerCollection = new AnswerCollection(),
                    resultView,
                    quizAmount = 0;

                if(quizCollection) {
                    resultView = new ResultView({ collection: quizCollection, quizAmount: quizAmount, answerCollection: answerCollection });
                }

                return resultView;
            }
        };

        return ResultController;
    }
);