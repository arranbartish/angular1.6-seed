(function () {
    'use strict';

    describe('moment filter', function() {

        var momentFilter;
        var momentService;

        beforeEach(function () {
            angular.mock.module('hello-world');
        });

        beforeEach(function () {
            inject( function(_momentFilter_, _momentService_){
                momentFilter = _momentFilter_;
                momentService = _momentService_;
            });
        });

        it('will be defined', function () {
            expect(momentFilter).toBeDefined();
        });

        it('will return a string for a moment', function () {
            var moment = momentService.getMoment('1978-08-02');
            var date = momentFilter(moment, 'YYYY-MM-DD');
            expect(date).toEqual(momentService.format(moment, 'YYYY-MM-DD'));
        });
    });

})();