(function () {
    'use strict';


    /* @ngInject */
    function HelloWorldController ($routeParams, momentService) {
        var vm = this;
        vm.selectedDate = momentService.getMoment($routeParams.date);
    }

    module.exports = function (ngModule) {
        ngModule.controller('helloWorldController', HelloWorldController);
    };
})();