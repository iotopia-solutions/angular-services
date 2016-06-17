'use strict';

describe('httpService', function() {

  // load the service's module
  beforeEach(module('angularServicesApp'));

  // instantiate service
  var httpService;
  var httpBackend;

  var mockAssetList = [{
    id: 1,
    owner: 1,
    type: 'test',
    category: 'test'
  }];

  beforeEach(inject(function($injector) {
    httpService = $injector.get('httpService');
    httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('read', function() {
    it('should make a GET request with an endpoint when calling read', function() {
      httpBackend.expectGET(/assets/).respond(mockAssetList);
      httpService.read({options:{path:'localhost', endpoint: 'assets'}});
      httpBackend.flush();
    });
  });

  describe('read query by id', function() {
    it('should make a GET request when calling read with an id', function() {
      var mockId = 1;
      httpBackend.expectGET(/assets\/\d+$/).respond(mockAssetList[0]);
        httpService.read({id: mockId, options:{path:'localhost', endpoint: 'assets'}}).then(function(response) {
        expect(response.id).toBe(mockId);
      });
      httpBackend.flush();
    });
  });
  
});
