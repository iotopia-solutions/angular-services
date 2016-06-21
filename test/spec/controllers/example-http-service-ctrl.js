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

  it('should attach a list of awesomeThings to the scope', function () {
    expect(httpServiceCtrl.setData).toBeDefined();
  });
});
