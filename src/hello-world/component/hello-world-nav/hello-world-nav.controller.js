(function () {
    'use strict';

    /* @ngInject */
    function HelloWorldNavController() {
    }

    module.exports = function (ngModule) {
        ngModule.controller('helloWorldNavController', HelloWorldNavController);
    };

})();