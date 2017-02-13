(function () {
    'use strict';
    var angular = require('angular');
    var ngModule = angular.module('hello-world', [require('angular-route')]);

    require('./route/date.route')(ngModule);

    require('./filter/moment/moment.filter')(ngModule);

    require('./service/salutation.service.js')(ngModule);
    require('./service/moment.service.js')(ngModule);

    require('./component/hello-world/hello-world')(ngModule);
    require('./component/hello-world-nav/hello-world-nav')(ngModule);
    require('./component/salutation-entries/salutation-entries')(ngModule);
    require('./component/salutation-form/salutation-form')(ngModule);

    module.exports = ngModule;
})();