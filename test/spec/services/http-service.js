'use strict';

describe('Service: httpService', function () {

  // load the service's module
  beforeEach(module('kronosAngularServicesApp'));

  // instantiate service
  var httpService;
  beforeEach(inject(function (_httpService_) {
    httpService = _httpService_;
  }));

  it('should do something', function () {
    expect(!!httpService).toBe(true);
  });

});
