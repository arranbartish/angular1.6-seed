(function () {
    'use strict';

    module.exports = function (ngModule) {

        require('./hello-world-nav-style.scss');
        require('./hello-world-nav.controller')(ngModule);
        require('./hello-world-nav.component')(ngModule);
    };
})();