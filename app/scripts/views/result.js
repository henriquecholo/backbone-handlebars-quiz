/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'answerCollection'
], function ($, _, Backbone, JST, AnswerCollection) {
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
                answerCollection.each(function(answerModel) {
                    var quizModel = quizCollection.find({id: answerModel.attributes.question});
                    var index = 0,
                        optionString = '';
                    while(index < 5) {
                        if(quizModel.answersFromUser[index] === answerModel.values()[index + 1])
                            console.log("Right answer");
                        index++;
                    }
                });
                self.render(answerCollection);
            });
        },
        el: '#result',
        render: function(collection){
            this.$el.html(this.template({collection: collection.toJSON()}));
        },
    });

    return ResultView;
});
