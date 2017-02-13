(function () {
    'use strict';

    describe('The hello world nav controller', function() {

        var helloWorldNavController;

        beforeEach(function () {
            angular.mock.module('hello-world');
        });

        beforeEach(function () {

            inject( function(_$controller_){
                var $controllerFactory = _$controller_;

                helloWorldNavController = $controllerFactory('helloWorldNavController', {
                });
            });

        });

        it('will be defined', function () {
            expect(helloWorldNavController).toBeDefined();
        });
    });


})();