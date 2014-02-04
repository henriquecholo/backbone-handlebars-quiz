/*global define*/
define(['emailModel','emailView'],
    function (EmailModel, EmailView) {
        'use strict';

        var EmailController = {
            action: function() {
                var model  = new EmailModel(),
                    emailView;

                if(model) {
                    emailView = new EmailView({ model: model });
                }

                return emailView;
            }
        };

        return EmailController;
    }
);