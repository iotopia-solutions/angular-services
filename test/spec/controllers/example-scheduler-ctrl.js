'use strict';

describe('Controller: exampleSchedulerServiceCtrl', function () {

  // load the controller's module
  beforeEach(module('kronos.apps.services'));

  var schedulerCtrl;
  var dataService;
  var scope;
  var $q;
  var deferred;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope) {
    scope = $rootScope.$new();
    dataService = $injector.get('dataService');
    $q = $injector.get('$q');

    deferred = $q.defer();
    spyOn(dataService, 'http').and.returnValue(deferred.promise);

    schedulerCtrl = $controller('exampleSchedulerCtrl', {
      $scope: scope,
      dataService: dataService
      // place here mocked dependencies
    });
  }));

  describe('employeeGrid', function(){
    it('should be defined', function () {
      expect(schedulerCtrl.employeeGrid).toBeDefined();
    });
  });


});
