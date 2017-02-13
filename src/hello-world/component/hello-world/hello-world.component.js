(function () {
    'use strict';
    var moment = require('moment');

    module.exports = function (ngModule) {
        ngModule.component('helloWorld', {
            template: require('./hello-world.html'),
            controller: 'helloWorldController as vm'
        });
    };
})();