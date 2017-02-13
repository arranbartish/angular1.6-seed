(function () {
    'use strict';

    var salutations = ['Hi', 'Hello', 'G\'day'];
    var angular = require('angular');
    var moment = require('moment');
    var uuid = require('uuid');

    /* @ngInject */
    function SalutationService($q, $window, momentService) {
        var service = this;
        var localStorage = $window.localStorage;
        var listKey = '$SALUTATION-ENTRIES$';

        function load() {
            return localStorage.getItem(listKey) ? angular.fromJson(localStorage.getItem(listKey)) : [];
        }

        function persist(list) {
            localStorage.setItem(listKey, angular.toJson(list));
            return list;
        }

        service.getAll = function () {
            return $q.when(load());
        };
        service.getAllForDate = function (date) {
            return service.getAll()
                .then(function (list) {
                    var results = list.filter(function (entry) {
                        return moment(entry.date, 'YYYY-MM-DD').isSame(date);
                    });
                    results.sort(function (entry1, entry2) {
                        var time1 = moment(entry1.time, 'hh:mm');
                        var time2 = moment(entry2.time, 'hh:mm');
                        if (time1.isBefore(time2)) {
                            return -1;
                        } else if (time2.isBefore(time1)) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    return results;
                });
        };
        service.addSalutationEntry = function (entry) {
            var entryWithId = angular.copy(entry);
            entryWithId.id = uuid.v4();
            return service.getAll()
                .then(function (list) {
                    list.push(entryWithId);
                    persist(list);
                    return entryWithId;
                });
        };
        service.getSalutations = function () {
            return salutations;
        };

        service.createBlankSalutation = function(date) {
            var time = momentService.format(date, 'H:mm');
            time = (time === '0:00') ? momentService.format(momentService.now(), 'H:mm') : time;

            return {
                date: momentService.format(date, 'YYYY-MM-DD'),
                time: time,
                salutation: '',
                name: ''
            };
        };
    }

    module.exports = function (ngModule) {
        ngModule.service('salutationService', SalutationService);
    };
})();