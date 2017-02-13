(function () {
    'use strict';

    module.exports = function (ngModule) {

         require('./salutation-entries-style.scss');
         require('./salutation-entries.controller')(ngModule);
         require('./salutation-entries.component')(ngModule);
     };
})();