'use strict';

describe('Service: httpService', function() {

  // load the service's module
  beforeEach(module('kronos.apps.services'));

  // instantiate service
  var httpService;
  var httpBackend;

  var mockData = [{
    id: 1,
    owner: 1,
    type: 'test',
    category: 'test'
  }];

  var path = 'localhost';
  var protocol = 'http';

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
      httpBackend.expectGET(/assets/).respond(mockData);
      httpService.read({options:{protocol: protocol, path: path, endpoint: 'assets'}});
      httpBackend.flush();
    });
  });

  describe('read query by id', function() {
    it('should make a GET request when calling read with an id', function() {
      var mockId = 1;
      httpBackend.expectGET(/assets\/\d+$/).respond(mockData[0]);
        httpService.read({id: mockId, options:{protocol: protocol, path: path, endpoint: 'assets'}}, true).then(function(response) {
        expect(response.id).toBe(mockId);
      });
      httpBackend.flush();
    });
  });

  describe('create', function() {
    it('should make a POST request when calling create', function() {
      httpBackend.expectPOST(/assets/).respond(mockData);
      var mockPayload = angular.copy(mockData);
      delete mockPayload.id;
      httpService.create({payload: mockPayload, options:{protocol: protocol, path: path, endpoint: 'assets'}});
      httpBackend.flush();
    });
  });

  describe('update', function() {
    it('should make a PATCH request when calling update', function() {
      httpBackend.expectPATCH(/assets\/\d+$/).respond(mockData[0]);
      var mockPayload = {
        id: 1,
        type: 'test'
      };
      httpService.update({payload: mockPayload, options:{protocol: protocol, path: path, endpoint: 'assets'}});
      httpBackend.flush();
    });
  });

  describe('delete', function() {
    it('should make a DELETE request when calling delete', function() {
      httpBackend.expectDELETE(/assets\/\d+$/).respond(200);
      var mockId = 1;
      httpService.delete({id: mockId, options:{protocol: protocol, path:path, endpoint: 'assets'}});
      httpBackend.flush();
    });
  });

});
