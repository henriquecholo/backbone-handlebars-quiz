/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'handlebars',
    'emailModel'
], function ($, _, Backbone, JST, Handlebars, EmailModel) {
    'use strict';

    var EmailView = Backbone.View.extend({
        template: JST['app/scripts/templates/email.hbs'],
        initialize: function(){
            this.model = new EmailModel();
            this.render();
        },
        el: '#email',
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
        },
        events: {
            submit: 'save'
        },
        save: function(e) {
            e.preventDefault();
            var emailText = this.$('#inputEmail').val();
            var passwordText = this.$('#inputPassword').val();
            if(emailText === '' && passwordText === ''){
                document.alert('Please provide the email and password!');
            }
            else if(emailText === '') {
                document.alert('Please provide the email!');
            }
            else if(passwordText === '') {
                document.alert('Please provide the password!');
            }
            else {
                localStorage.clear();
                this.model.save({email: emailText, password: passwordText, completed: true});
                this.$('#inputEmail').attr('disabled', true);
                this.$('#inputPassword').attr('disabled', true);
                this.$('#signIn').attr('disabled', true);
                var label = document.createElement('label');
                label.textContent = 'Email and password saved on localStorage.';
                this.$('#signInForm').append(label);
                Backbone.history.navigate('/quizz', { trigger: true });
            }
        }
    });

    return EmailView;
});
