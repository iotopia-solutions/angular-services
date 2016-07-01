'use strict';

describe('Service: dataService', function () {

  // load the service's module
  beforeEach(module('kronos.apps.services'));

  // instantiate service
  var dataService;
  var httpService;
  var httpBackend;

  var httpRequest = {
    id: 108,
    options:{
      path: 'localhost:4100',
      endpoint: 'assets'
    }
  };

  beforeEach(inject(function($injector) {
    httpService = $injector.get('httpService');
    dataService =  $injector.get('dataService');
    httpBackend = $injector.get('$httpBackend');
    spyOn(httpService, 'read').and.callThrough();
    spyOn(dataService, 'error').and.callThrough();
    spyOn(console, 'log');
  }));

  describe('http', function(){
    it('should call httpService', function(){
      dataService.http('read', httpRequest, true);
      expect(httpService.read).toHaveBeenCalled();
    });
  });

  describe('success', function(){
    it('should return data object', function(){
      expect(dataService.success({data:'data'})).toEqual(Object({ data: 'data' }));
    });
  });

  describe('error', function(){
    it('should call console.log', function(){
      dataService.error({error: 'this is an error'});
      expect(console.log).toHaveBeenCalled();
    });
  });
  
});
