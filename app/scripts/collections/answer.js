/*global define*/

define([
    'underscore',
    'backbone',
    'models/answer',
    'localStorage'
], function (_, Backbone, AnswerModel, LocalStorage) {
    'use strict';

    var AnswerCollection = Backbone.Collection.extend({
        model: AnswerModel,
        url: "/scripts/data/answers-collection.json",
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

    return AnswerCollection;
});
