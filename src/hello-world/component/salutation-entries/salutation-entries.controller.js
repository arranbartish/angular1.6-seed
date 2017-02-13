(function () {
    'use strict';

    /* @ngInject */
    function SalutationEntriesController($rootScope, salutationService) {
        var vm = this;
        vm.entries = [];
        function refreshList() {
            salutationService.getAllForDate(vm.date)
                .then(function (entries) {
                    vm.entries = entries;
                });
        }

        vm.$onInit = function () {
            refreshList();
        };

        $rootScope.$on('newEntry', function () {
            refreshList();
        });
    }

    module.exports = function (ngModule) {
        ngModule.controller('salutationEntriesController', SalutationEntriesController);
    };

})();