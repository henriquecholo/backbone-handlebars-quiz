/*global define*/

define([
    'underscore',
    'backbone',
    'models/quiz',
    'localStorage'
], function (_, Backbone, QuizModel, LocalStorage) {
    'use strict';

    var QuizCollection = Backbone.Collection.extend({
        model: QuizModel,
        url: "/js/data/quiz-collection.json",
        localStorage : new LocalStorage("QuizCollection"),
        refreshFromServer : function(options) {
            return Backbone.ajaxSync('read', this, options);
        },
        completed: function() {
          return this.where({completed: true});
        },
        remaining: function() {
          return this.where({completed: false});
        },
        comparator: function(model){
          return model.get('timestamp');
        }
    });

    return QuizCollection;
});
