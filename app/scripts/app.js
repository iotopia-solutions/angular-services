'use strict';

/**
 * @ngdoc overview
 * @name angularServicesApp
 * @description
 * # angularServicesApp
 *
 * Main module of the application.
 */
angular
  .module('angularServicesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
