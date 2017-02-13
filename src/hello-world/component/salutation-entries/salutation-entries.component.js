(function () {
  'use strict';

  module.exports = function(ngModule) {
    ngModule.component('salutationEntries', {
        bindings: {
            date: '<'
        },
        template: require('./salutation-entries.html'),
        controller: 'salutationEntriesController as vm'
    });
  };
})();