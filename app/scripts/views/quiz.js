/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'quizCollection'
], function ($, _, Backbone, JST, QuizCollection) {
    'use strict';

    var QuizView = Backbone.View.extend({
        template: JST['app/scripts/templates/quiz.hbs'],
        initialize: function(){
            this.collection = new QuizCollection();
            var collection = this.collection,
                self = this;
            collection.refreshFromServer({success: function(freshData) {
                collection.reset(freshData);
                var count = 1;
                collection.each(function(model) {
                    model.set({id: count});
                    model.save();
                    count++;
                });
                collection.fetch();
            }, error: function(){
                console.log('Error on refreshFromServer ajax call');
            }}).done(function() {
                self.render(collection);
                self.$el.append('<div id="submitDiv" class="col-sm-offset-5"></div>');
                var button = document.createElement('button');
                button.id = 'submitQuiz';
                button.textContent = 'Submit Quiz';
                $('#submitDiv').append(button);
                $('#submitQuiz').addClass('btn btn-primary');
                $('#submitQuiz').css({'margin-bottom':'20px'});
            });
        },
        el: '#quiz',
        render: function(collection){
            this.$el.html(this.template({collection: collection.toJSON()}));
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
