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
      return dataFromAPI;
    }

    //TODO: expand error handling, or show via dialog
    function error(errorFromAPI){
      console.log('error', errorFromAPI);
    }

    /**
     * @ngdoc
     * @name dataService.http
     * @methodOf kronos.apps.services.dataService
     * @function
     * @description
     * A helper method to extend httpService for REST calls
     * @example
     * dataService.http('read', {id: 401, options:{path: 'localhost:4100', endpoint: 'assets'}}, true).then(setData);
     * @param {string} httpService function pass the name of the desired CRUD call example: 'read' *required
     * @param {object} requestObj pass a request Object containing the following parameters *required
     * @param  {object} requestObj.options set the path, endpoint and more in the future. *required
     * @param  {string} requestObj.options.path The path of the URL you'd like to access. *required
     * @param  {string} requestObj.options.endpoint The name of the endpoint you'd like to access. *required
     * @param  {int=} requestObj.id   The id or identifier of the specific record to fetch.
     * @param  {bool=} cache pass true or false to cache data.
     * @return {httpPromise} The output will return a $promise, with success/data or a console error will occur
     */
    this.http = function(method, params, cache){
      return httpService[method](params, cache).then(success, error);
    };

    this.deserializeArray = function(dataFromAPI){
      var deserialized = [];
      angular.forEach(dataFromAPI, function(data){
        deserialized.push(data[0]);
      });
      return deserialized;
    };

});
