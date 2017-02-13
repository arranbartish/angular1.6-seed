(function () {
    'use strict';
    var _ = require('lodash');

    /* @ngInject */
    function SalutationEntryFormController(salutationService, $rootScope) {
        var vm = this;

        function initialiseSalutation(){
            vm.newEntry = salutationService.createBlankSalutation(vm.date);
        }

        vm.$onInit = function () {
            initialiseSalutation();
            vm.salutations = salutationService.getSalutations();
        };

        function selectSalutation() {
            var availableSalutations = salutationService.getSalutations();
            var selected = _.random(0, availableSalutations.length - 1);
            return availableSalutations[selected];
        }

        vm.addSalutationEntry = function () {
            if (_.isEmpty(vm.newEntry.salutation)) {
                vm.newEntry.salutation = selectSalutation();
            }
            salutationService.addSalutationEntry(vm.newEntry)
                .then(function (newEntry) {
                    $rootScope.$broadcast('newEntry', newEntry);
                    initialiseSalutation();
                });
        };

    }

    module.exports = function (ngModule) {
        ngModule.controller('salutationEntryFormController', SalutationEntryFormController);
    };

})();