/* global document */
(function () {
    'use strict';
    var angular = require('angular');
    var appElement = document.querySelector('body');
    angular.bootstrap(appElement, [
        require('./hello-world/app').name
    ], { strictDi: true });

    if (module.hot) {
        module.hot.accept();
    }
})();