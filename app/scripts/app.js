'use strict';

/**
 * @ngdoc overview
 * @name kronos.apps.services
 * @description
 * # kronos.apps.services
 *
 * Main module of the application.
 */
angular
  .module('kronos.apps.services', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'exampleHttpServiceCtrl',
        controllerAs: 'exampleHttpServiceCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
