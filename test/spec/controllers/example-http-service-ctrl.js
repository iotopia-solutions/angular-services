'use strict';

describe('Controller: exampleHttpServiceCtrl', function () {

  // load the controller's module
  beforeEach(module('kronos.apps.services'));

  var httpServiceCtrl;
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

    httpServiceCtrl = $controller('exampleHttpServiceCtrl', {
      $scope: scope,
      dataService: dataService
      // place here mocked dependencies
    });
  }));

  describe('setData', function(){
    it('should be defined', function () {
      expect(httpServiceCtrl.setData).toBeDefined();
    });

    it('should return the method if name and data are not supplied', function () {
      httpServiceCtrl.setData('testAttribute');
      expect(httpServiceCtrl.testAttribute).toBe();
    });

    it('should set data on the controller', function () {
      httpServiceCtrl.setData('testAttribute', {data:'data'}, false);
      expect(httpServiceCtrl.testAttribute).toEqual({data:'data'});
    });

    it('should set data on the scope', function () {
      httpServiceCtrl.setData('testAttribute', {data:'data'}, true);
      expect(scope.testAttribute).toEqual({data:'data'});
    });
  });

  describe('clearData', function(){
    it('should be defined', function () {
      expect(httpServiceCtrl.clearData).toBeDefined();
    });

    it('should return the method if nothing is supplied', function () {
      expect(httpServiceCtrl.clearData()).toBe();
    });

    it('should clear the data on the controller', function () {
      httpServiceCtrl.clearData('testAttribute', false);
      expect(httpServiceCtrl.testAttribute).toBe();
    });

    it('should set data on the scope', function () {
      httpServiceCtrl.clearData('testAttribute', true);
      expect(scope.testAttribute).toBe();
    });
  });

  describe('getList', function(){
    beforeEach(inject(function(){
      spyOn(httpServiceCtrl, 'getList').and.callThrough();
    }));

    it('should be defined', function () {
      expect(httpServiceCtrl.getList).toBeDefined();
    });

    it('should call the data service', function () {
      httpServiceCtrl.getList(false);
      expect(dataService.http).toHaveBeenCalled();
    });
  });

  describe('getById', function(){
    beforeEach(inject(function(){
      spyOn(httpServiceCtrl, 'getById').and.callThrough();
    }));

    it('should be defined', function () {
      expect(httpServiceCtrl.getById).toBeDefined();
    });

    it('should call dataService.http', function () {
      httpServiceCtrl.getById(22);
      expect(dataService.http).toHaveBeenCalled();
    });
  });

});
