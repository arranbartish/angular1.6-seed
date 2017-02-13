(function () {
    'use strict';

    module.exports = function (ngModule) {

        require('./hello-world-style.scss');
        require('./hello-world.controller.js')(ngModule);
        require('./hello-world.component.js')(ngModule);
    };
})();