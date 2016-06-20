'use strict';

/**
 * @ngdoc service
 * @name kronos.apps.services.dataService
 * @description
 * # dataService
 * Service in the kronos.apps.services.
 */
angular.module('kronos.apps.services')
  .service('dataService', function (httpService) {

    function success(dataFromAPI){
      if(dataFromAPI){
        return dataFromAPI;
      }
    }

    //TODO: hook error handling to a message or dialog service
    function error(data){
      console.log('error', data);
    }

    this.http = function(method, params){
      return httpService[method](params).then(function(data){
        return success(data);
      }, function(data){
        return error(data);
      });
    };

});
