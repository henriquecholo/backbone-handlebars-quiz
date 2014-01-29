/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'answerCollection',
    'handlebars'
], function ($, _, Backbone, JST, AnswerCollection, Handlebars) {
    'use strict';

    var ResultView = Backbone.View.extend({
        template: JST['app/scripts/templates/result.hbs'],
        initialize: function(){
            this.quizCollection = new Backbone.LocalStorage("QuizCollection");
            this.answerCollection = new AnswerCollection();
            var answerCollection = this.answerCollection,
                quizCollection = this.quizCollection,
                self = this;
            answerCollection.refreshFromServer({success: function(freshData) {
                answerCollection.reset(freshData);
            }, error: function(){
                console.log("Error on refreshFromServer ajax call");
            }}).done(function() {
                var quizAmount = 0;
                answerCollection.each(function(answerModel) {
                    var quizModel = quizCollection.find({id: answerModel.attributes.question});
                    var index = 0,
                        optionString = '',
                        rightFromUser = 0;
                    while(index < 5) {
                        if(quizModel.answersFromUser[index] === answerModel.values()[index + 1]) {
                            rightFromUser++;
                        }
                        index++;
                    }
                    quizModel.correctPercentage = (100 * rightFromUser) / 5;
                    quizAmount += quizModel.correctPercentage;
                    localStorage.setItem("QuizCollection-" + answerModel.attributes.question, JSON.stringify(quizModel));
                });
                Handlebars.registerHelper("AverageRate", function() {
                    return quizAmount / quizCollection.records.length;
                });
                self.render(quizCollection);
            });
        },
        el: '#result',
        render: function(collection){
            this.$el.html(this.template({collection: collection.findAll()}));
        },
    });

    return ResultView;
});
