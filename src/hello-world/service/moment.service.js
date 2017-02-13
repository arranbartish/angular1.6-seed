(function () {
    'use strict';

    var moment = require('moment');

    /* @ngInject */
    function MomentService() {
        var service = this;

        service.now = function() {
            return moment();
        };

        service.getMoment = function (date) {
            return (moment.isMoment(date)) ? date : moment(date);
        };

        service.format = function (value, format){
            var formatToUse = !!(format)? format : 'YYYY-MM-DD H:mm';
            var result = '';

            if (moment.isMoment(value)) {
                result = value.format(formatToUse);
            } else if (moment.isDate(value)) {
                result = moment(value).format(formatToUse);
            }

            return result;
        };

        service.isMoment = function (value) {
            return moment.isMoment(value);
        };
    }

    module.exports = function (ngModule) {
        ngModule.service('momentService', MomentService);
    };
})();