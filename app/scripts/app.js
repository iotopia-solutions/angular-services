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
    'ngRoute',
    'agGrid'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'exampleHttpServiceCtrl',
        controllerAs: 'exampleHttpServiceCtrl'
      })
      .when('/scheduler', {
        templateUrl: 'views/scheduler.html',
        controller: 'exampleSchedulerCtrl',
        controllerAs: 'exampleSchedulerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
