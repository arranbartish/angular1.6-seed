(function () {
    'use strict';

    module.exports = function (ngModule) {
        ngModule.component('salutationEntryForm', {
            template: require('./salutation-form.html'),
            bindings: {
                date: '<'
            },
            controller: 'salutationEntryFormController as vm'
        });
    };
})();