/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var QuizView = Backbone.View.extend({
        template: JST['app/scripts/templates/quiz.hbs'],
        initialize: function () {
            var self = this;
            this.collection.refreshFromServer({success: function(freshData) {
                self.collection.reset(freshData);
                var count = 1;
                self.collection.each(function(model) {
                    model.set({id: count});
                    model.save();
                    count++;
                });
                self.collection.fetch();
            }, error: function(){
                console.log('Error on refreshFromServer ajax call');
            }}).done(function() {
                self.render();
            });
        },
        render: function(){
            this.$el.html(this.template({collection: this.collection.toJSON()}));
        },
        events: {
            'click .list-group-item': 'checkActiveAnswers',
            'click #submitQuiz': 'submitQuiz'
        },
        checkActiveAnswers: function (e){
            e.preventDefault();
            var element = this.$(e.currentTarget);
            if(element.hasClass('active')) {
                element.removeClass('active');
            }
            else {
                var activesItems = element.parent().children('.active');
                var listGroupActive = activesItems ? activesItems.length : 0;
                if(listGroupActive >= 3){
                    document.alert('Can only select 3 options.');
                }
                else {
                    element.addClass('active');
                }
            }
        },
        submitQuiz: function () {
            this.collection.each(function(model) {
                var option1 = $('#option1-' + model.id).hasClass('active');
                var option2 = $('#option2-' + model.id).hasClass('active');
                var option3 = $('#option3-' + model.id).hasClass('active');
                var option4 = $('#option4-' + model.id).hasClass('active');
                var option5 = $('#option5-' + model.id).hasClass('active');
                model.set( {answersFromUser: [option1, option2, option3, option4, option5]});
                model.save();
            });
            Backbone.history.navigate('/result', { trigger: true });
        }
    });

    return QuizView;
});
