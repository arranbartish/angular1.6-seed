(function () {
    'use strict';

    describe('The salutation entries controller', function() {
        var salutationEntriesController;
        var realSalutationService;
        var realRootScope;
        var $q;

        var eventsToListenTo = [];
        var expectedEntries = [];
        var now = new Date();

        beforeEach(function () {
            angular.mock.module('hello-world');
        });

        beforeEach(function () {
            eventsToListenTo = [];
            expectedEntries = [];


            inject( function(_$rootScope_, _$controller_, _salutationService_, _$q_){
                var $controllerFactory = _$controller_;
                realSalutationService = _salutationService_;
                realRootScope = _$rootScope_;
                $q = _$q_;
                now = new Date();

                expectedEntries.push(realSalutationService.createBlankSalutation(now));

                salutationEntriesController = $controllerFactory('salutationEntriesController', {
                    salutationService: {
                        getAllForDate: function () {
                            return $q.when(expectedEntries);
                        }
                    },
                    $rootScope: {
                        $on: function(key, callBack){
                            eventsToListenTo.push({
                                key: key,
                                callBack: callBack
                            });
                            realRootScope.$on(key, callBack);
                        }
                    }
                });
            });
        });

        it('will be defined', function() {
            expect(salutationEntriesController).toBeDefined();
        });

        it('will be listening to expected events', function () {
            var eventKeys = [];
            eventsToListenTo.every(function (entry) {
                eventKeys.push(entry.key);
            });
            expect(eventKeys).toEqual(['newEntry']);
        });

        it('will not have entries on creation', function () {
            expect(salutationEntriesController.entries).toEqual([]);
        });

        describe('onInit', function() {

            it('will populate the entries', function () {
                var expectedEntry = realSalutationService.createBlankSalutation(now);
                salutationEntriesController.$onInit();
                realRootScope.$apply();
                expect(salutationEntriesController.entries).toEqual([expectedEntry]);
            });
        });

        describe('on newEntry event', function() {

            it('will populate entries', function () {
                var expectedEntry = realSalutationService.createBlankSalutation(now);
                realRootScope.$emit('newEntry', expectedEntry);
                realRootScope.$apply();
                expect(salutationEntriesController.entries).toEqual([expectedEntry]);
            });
        });
    });
})();