(function () {
    'use strict';

    describe('Hello world controller', function() {

        var helloWorldController;
        var momentService;
        var now = new Date();

        beforeEach(function () {
            angular.mock.module('hello-world');
        });

        beforeEach(function () {
            inject( function(_$controller_, _momentService_){
                var $controllerFactory = _$controller_;
                momentService = _momentService_;

                helloWorldController = $controllerFactory('helloWorldController', {
                    $routeParams: {date: momentService.format(now, 'YYYY-MM-DD')},
                    momentFilter: _momentService_
                });
            });

        });

        it('will be defined', function () {
            expect(helloWorldController).toBeDefined();
        });


        it('date will be defined', function () {
            expect(helloWorldController.selectedDate).toBeDefined();
        });
    });

})();