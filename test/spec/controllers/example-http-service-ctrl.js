'use strict';

describe('Controller: exampleHttpServiceCtrl', function () {

  // load the controller's module
  beforeEach(module('kronos.apps.services'));

  var httpServiceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    httpServiceCtrl = $controller('exampleHttpServiceCtrl', {
      $scope: scope
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
    it('should be defined', function () {
      expect(httpServiceCtrl.getList).toBeDefined();
    });
  });
  
  describe('getById', function(){
    it('should be defined', function () {
      expect(httpServiceCtrl.getById).toBeDefined();
    });

  });


});
