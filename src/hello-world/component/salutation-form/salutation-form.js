(function () {
    'use strict';

    module.exports = function (ngModule) {

        require('./salutation-form-style.scss');
        require('./salutation-form.controller')(ngModule);
        require('./salutation-form.component')(ngModule);
    };
})();