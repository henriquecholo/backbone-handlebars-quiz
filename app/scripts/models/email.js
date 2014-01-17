/*global define*/

define([
    'underscore',
    'backbone',
    'localStorage'
], function (_, Backbone, LocalStorage) {
    'use strict';

    var EmailModel = Backbone.Model.extend({
        defaults: {
            email: "",
            password: "",
            timestamp: 0,
            completed: false
        },
        url: "/scripts/data/email-model.json",
        localStorage : new LocalStorage("EmailModel"),
        initialize: function() {
        },
        validate: function(attrs) {
          if ( _.isEmpty(attrs.email) ) {
            return "Missing Email";
          }
          if ( _.isEmpty(attrs.password) ) {
            return "Missing Password";
          }
        }
    });

    return EmailModel;
});
