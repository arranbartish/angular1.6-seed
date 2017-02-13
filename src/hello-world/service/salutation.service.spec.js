(function () {
    'use strict';

    describe('A service suite', function() {

        var salutationService;
        var window;
        var q;
        var moment;
        var momentService;

        var data;
        var now;

        beforeEach(function() {
            angular.mock.module('hello-world');
        });

        beforeEach(function(){

            inject( function(_salutationService_, _$window_, _$q_, _momentFilter_, _momentService_){
                salutationService = _salutationService_;
                window = _$window_;
                q = _$q_;
                moment = _momentFilter_;
                momentService = _momentService_;
            });

        });

        beforeEach(function () {
            now = new Date();
            data = [{
                date: moment(now, 'YYYY-MM-DD'),
                time: moment(now, 'H:mm'),
                salutation: 'salutation',
                name: 'some name'
            }];
        });

        it('time logger will be defined', function() {
            expect(salutationService).toBeDefined();
        });

        describe('get salutations', function() {

            it('will return a list greater than 0', function () {
                var result = salutationService.getSalutations();
                expect(result.length).toBeGreaterThan(0);
            });
        });

        describe('create blank salutation', function() {

            it('will create a blank salutation with a date', function () {
                now = new Date();
                var expectedSalutation = {
                    date: moment(now, 'YYYY-MM-DD'),
                    time: moment(now, 'H:mm'),
                    salutation: '',
                    name: ''
                };
                var result = salutationService.createBlankSalutation(now);
                expect(result).toEqual(expectedSalutation);
            });

            it('will create a salutation with a specific time', function () {
                var moment = momentService.getMoment('1978-08-02 06:59');
                var result = salutationService.createBlankSalutation(moment);
                expect(result.time).toEqual('6:59');
            });
        });
    });
})();