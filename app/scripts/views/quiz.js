/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'hbs!templates/quiz'
], function ($, _, Backbone, Handlebars, Template) {
    'use strict';

    var QuizView = Backbone.View.extend({
        template: Template,
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
            }}).done(function() {
                self.render(collection);
                self.$el.append("<div id='submitDiv' class='col-sm-offset-4'></div>");
                var button = document.createElement("button");
                button.id = 'submitQuiz';
                button.textContent = "Submit Quiz";
                $('#submitDiv').append(button);
                $('#submitQuiz').addClass("btn btn-primary");
                $('#submitQuiz').css({"margin-left":"40px"});
            });
        },
        el: '#quiz',
        render: function(collection){
            this.$el.html(this.template({collection: collection.toJSON()}));
        },
        events: {
            "click .list-group-item": 'checkActiveAnswers',
            "click #submitQuiz": 'submitQuiz'
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
                    alert("Can only select 3 options.");
                }
                else {
                    element.addClass('active');
                }
            }
        },
        submitQuiz: function (e) {
            e.preventDefault();
            alert("Submitting");
        }
    });

    return QuizView;
});
