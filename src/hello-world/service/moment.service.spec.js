(function () {
    'use strict';

    var momentService;

    describe('moment service', function() {

        beforeEach(function () {
            angular.mock.module('hello-world');
        });

        beforeEach(function () {
            inject( function(_momentService_){
                momentService = _momentService_;
            });
        });

        it('will be defined', function () {
            expect(momentService).toBeDefined();
        });

        it('will return a moment for now', function () {
            var now = momentService.now();
            expect(now.isValid()).toBeTruthy();
        });

        it('will return a specific date', function () {
            expect(momentService.getMoment('1978-08-02')).toBeDefined();
        });

        it('will format a date', function () {
            var date = momentService.getMoment('1978-08-02');
            var dateString = momentService.format(date, 'YYYY-MM-DD');
            expect(dateString).toEqual('1978-08-02');
        });

        it('will format a JS date', function () {
            var now = momentService.now();
            var dateString = momentService.format(new Date(), 'YYYY-MM-DD');
            var nowString = momentService.format(now, 'YYYY-MM-DD');
            expect(dateString).toEqual(nowString);
        });

        it('will identify a moment', function () {
            var now = momentService.now();
            expect(momentService.isMoment(now)).toBeTruthy();
        });

        it('will identify a date as not a moment', function () {
            var now = new Date();
            expect(momentService.isMoment(now)).toBeFalsy();
        });

    });
})();