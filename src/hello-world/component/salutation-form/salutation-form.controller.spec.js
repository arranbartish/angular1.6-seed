(function () {
    describe('salutation form controller', function() {
        var nowAsString = '1978-08-02 06:59';
        var salutationFormController;
        var $q;
        var moment;
        var momentService;
        var realSalutationService;
        var realRootScope;

        var addedSalutationEntry;
        var broadcastSalutationEntry;
        var now;

        beforeEach(function () {
            angular.mock.module('hello-world');
        });

        beforeEach(inject(function(_$controller_, _$q_, _momentFilter_, _salutationService_, _$rootScope_, _momentService_){
            var $controllerFactory = _$controller_;
            $q = _$q_;
            moment = _momentFilter_;
            momentService = _momentService_;
            realSalutationService = _salutationService_;
            realRootScope = _$rootScope_;
            addedSalutationEntry = null;
            now = momentService.getMoment(nowAsString);

            function mockAddSalutationEntry(addedEntry) {
                addedSalutationEntry = addedEntry;
                return $q.when(function () {
                    return addedEntry;
                });
            }

            function mockBroadcast(key, entry) {
                broadcastSalutationEntry = {
                    key: key,
                    entry: entry
                };
            }

            salutationFormController = $controllerFactory('salutationEntryFormController', {
                salutationService: {
                    getSalutations: function () {
                        return ['Hi'];
                    },
                    addSalutationEntry: mockAddSalutationEntry,
                    createBlankSalutation: realSalutationService.createBlankSalutation
                },
                $rootScope: {
                    $broadcast: mockBroadcast
                }
            });
            salutationFormController.date = now;
        }));

        it('controller will be defined', function () {

            expect(salutationFormController).toBeDefined();
        });

        describe('add salutation', function() {

            var expectedEntry;

            beforeEach(function () {
                expectedEntry = realSalutationService.createBlankSalutation(now);
                expectedEntry.salutation = 'Some salutation';
                expectedEntry.name = 'Some name';
            });

            it('salutation will be added', function () {
                salutationFormController.newEntry = angular.copy(expectedEntry);
                salutationFormController.addSalutationEntry();
                expect(addedSalutationEntry).toEqual(expectedEntry);
            });

            it('salutation will be broadcast with correct key ', function () {
                salutationFormController.newEntry = angular.copy(expectedEntry);
                salutationFormController.addSalutationEntry();
                realRootScope.$apply();
                expect(broadcastSalutationEntry.key).toEqual('newEntry');
            });

            it('salutation will get a random salutation when salutation is empty', function () {
                salutationFormController.newEntry = angular.copy(expectedEntry);
                salutationFormController.newEntry.salutation = '';
                salutationFormController.addSalutationEntry();
                expect(addedSalutationEntry.salutation).not.toEqual('');
            });
        });

        describe('onInit', function() {

            var expectedEntry;

            beforeEach(function () {
                expectedEntry = realSalutationService.createBlankSalutation(now);
            });

            it('will initialise a blank entry with a specified date', function () {
                salutationFormController.$onInit();
                expect(salutationFormController.newEntry).toEqual(expectedEntry);
            });

            it('will initialize a blank entry with a specified time', function () {
                salutationFormController.$onInit();
                expect(salutationFormController.newEntry.time).toEqual('6:59');
            });

            it('will initialize with at least 1 salutation', function () {
                salutationFormController.$onInit();
                expect(salutationFormController.salutations.length).toBeGreaterThanOrEqual(1);
            });

        });
    });
})();