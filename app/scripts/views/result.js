/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'handlebars'
], function ($, _, Backbone, JST, Handlebars) {
    'use strict';

    var ResultView = Backbone.View.extend({
        template: JST['app/scripts/templates/result.hbs'],
        initialize: function () {
            var self = this;
            this.options.answerCollection.refreshFromServer({success: function(freshData) {
                self.options.answerCollection.reset(freshData);
            }, error: function(){
                console.log('Error on refreshFromServer ajax call');
            }}).done(function() {
                self.options.answerCollection.each(function(answerModel) {
                    var quizModel = self.collection.find({id: answerModel.attributes.question});
                    var index = 0,
                        rightFromUser = 0;
                    while(index < 5) {
                        if(quizModel.answersFromUser[index] === answerModel.values()[index + 1]) {
                            rightFromUser++;
                        }
                        index++;
                    }
                    quizModel.correctPercentage = (100 * rightFromUser) / 5;
                    self.options.quizAmount += quizModel.correctPercentage;
                    localStorage.setItem('QuizCollection-' + answerModel.attributes.question, JSON.stringify(quizModel));
                });
                Handlebars.registerHelper('AverageRate', function() {
                    return self.options.quizAmount / self.collection.records.length;
                });
                self.render();
            });
        },
        render: function(){
            this.$el.html(this.template({collection: this.collection.findAll()}));
        }
    });

    return ResultView;
});
