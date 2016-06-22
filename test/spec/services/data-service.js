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
  }));

  describe('http',function(){
    beforeEach(function(){
      spyOn(httpService, 'read').and.callThrough();
    });

    it('should call httpService', function(){
      dataService.http('read', httpRequest);
      expect(httpService.read).toHaveBeenCalled();
    });
  });

});
