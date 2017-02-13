(function () {
    'use strict';
    var moment = require('moment');

    /* @ngInject */
    function DateRoute($routeProvider) {
        $routeProvider.when('/:date', {
            template: require('./date.html')
        });
        $routeProvider.otherwise('/' + moment().format('YYYY-MM-DD'));
    }

    module.exports = function (ngModule) {
        ngModule.config(DateRoute);
    };

})();