/*global define*/
define(['quizCollection','quizView'],
    function (QuizCollection, QuizView) {
        'use strict';

        var QuizController = {
            action: function() {
                var collection  = new QuizCollection(),
                    quizView;

                if(collection) {
                    quizView = new QuizView({ collection: collection });
                }

                return quizView;
            }
        };

        return QuizController;
    }
);