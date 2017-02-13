(function () {
    'use strict';

    /* @ngInject */
    function MomentFilter(momentService) {
        return function (value, format) {
            return momentService.format(value, format);
        };
    }

    module.exports = function (ngModule) {
        ngModule.filter('moment', MomentFilter);
    };
})();