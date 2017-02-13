(function () {
    'use strict';

    module.exports = function (ngModule) {
        ngModule.component('helloWorldNav', {
            template: require('./hello-world-nav.html'),
            bindings: {
                date: '<'
            },
            controller: 'helloWorldNavController as vm'
        });
    };
})();