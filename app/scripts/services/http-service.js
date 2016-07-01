'use strict';
/**
* @ngdoc service
* @name kronos.apps.services.httpService
* @description
* # httpService
* # a service that abstracts $resource for simple and agnostic CRUD network calls.
* unless extra business logic is neccessary, or custom error handling is needed, use the data-service for error handling
* *** Once in the environment, we may need to pass $token and $serverPath for Kronos Schedule.
* @requires $resource
*/
angular.module('kronos.apps.services')
  .service('httpService', function ($resource) {
    var request = {
      'url': '/:endpoint/:id',
      'actions': {
        'read': {
          'method': 'GET'
        },
        'create': {
          'method': 'POST'
        },
        'update': {
          'method': 'PATCH'
        },
        'delete': {
          'method': 'DELETE'
        }
      },
      'parameters':{
        'id': '@id',
        'limit' : '@limit'
      }
    };

    function setActions(action, obj, cache){
     request.actions[action].isArray = obj.id ? false : true;
     request.actions[action].cache = cache ? cache : false;
    }

    function createBasePath(obj){
      return obj.options.protocol + '://' + obj.options.path;
    }

    this.requestResource = function(obj){
      var path = createBasePath(obj);
      return $resource(((path) + request.url), request.parameters, request.actions);
    };

    /**
     * @ngdoc
     * @name httpService.create
     * @methodOf kronos.apps.services.httpService
     * @function
     * @description
     * Method to create data through an API
     * @example
     * httpService.create(payload, {options:{path: 'localhost:4100', endpoint: 'assets'}});
     * @param {object} requestObj pass a request Object containing the following parameters *required
     * @param  {object} requestObj.options set the path, endpoint and more in the future. *required
     * @param  {string} requestObj.options.protocol The protocol of the URL you'd like to access. *required
     * @param  {string} requestObj.options.path The path of the URL you'd like to access. *required
     * @param  {string} requestObj.options.endpoint The name of the endpoint you'd like to access. *required
     * @param  {object} requestObj.payload The data payload object per requirements of the api *required
     * @return {httpPromise} The output will return a $promise, with success/data or an error
     */
    this.create = function (obj, cache) {
      var requestResource = this.requestResource(obj);
      setActions('create', obj, cache);
      return requestResource.create({endpoint: obj.options.endpoint}, obj.payload).$promise;
    };

    /**
     * @ngdoc
     * @name httpService.delete
     * @methodOf kronos.apps.services.httpService
     * @function
     * @description
     * Method to DELETE data through an API
     * @example
     * httpService.update({id: 43, options:{path: 'localhost:4100', endpoint: 'assets'}});
     * @param {object} requestObj pass a request Object containing the following parameters *required
     * @param  {object} requestObj.options set the path, endpoint and more in the future. *required
     * @param  {string} requestObj.options.protocol The protocol of the URL you'd like to access. *required
     * @param  {string} requestObj.options.path The path of the URL you'd like to access. *required
     * @param  {string} requestObj.options.endpoint The name of the endpoint you'd like to access. *required
     * @param  {int} requestObj.id The id of the record you'd like to delete. *required
     * @return {httpPromise} The output will return a $promise, with success/data or an error
     */
    this.delete = function(obj) {
      var requestResource = this.requestResource(obj);
      return requestResource.delete({endpoint: obj.options.endpoint, id: obj.id}).$promise;
    };

    /**
     * @ngdoc
     * @name httpService.update
     * @methodOf kronos.apps.services.httpService
     * @function
     * @description
     * Method to update data through an API
     * @example
     * httpService.update({payload, options:{path: 'localhost:4100', endpoint: 'assets'}});
     * @param {object} requestObj pass a request Object containing the following paramseters *required
     * @param  {object} requestObj.options set the path, endpoint and more in the future. *required
     * @param  {string} requestObj.options.protocol The protocol of the URL you'd like to access. *required
     * @param  {string} requestObj.options.path The path of the URL you'd like to access. *required
     * @param  {string} requestObj.options.endpoint The name of the endpoint you'd like to access. *required
     * @param  {object} requestObj.payload   The data payload object per requirements of the api *required
     * @return {httpPromise} The output will return a $promise, with success/data or an error
     */
    this.update = function (obj) {
      var requestResource = this.requestResource(obj);
      return requestResource.update({endpoint: obj.options.endpoint}, obj.payload).$promise;
    };

    /**
     * @ngdoc
     * @name httpService.read
     * @methodOf kronos.apps.services.httpService
     * @function
     * @description
     * Method to read data from an API
     * @example
     * httpService.read({id: 401, options:{path: 'localhost:4100', endpoint: 'assets'}});
     * @param {object} requestObj pass a request Object containing the following parameters *required
     * @param  {object} requestObj.options set the path, endpoint and more in the future. *required
     * @param  {string} requestObj.options.protocol The protocol of the URL you'd like to access. *required
     * @param  {string} requestObj.options.path The path of the URL you'd like to access. *required
     * @param  {string} requestObj.options.endpoint The name of the endpoint you'd like to access. *required
     * @param  {int=} requestObj.id   The id or identifier of the specific record to fetch.
     * @return {httpPromise} The output will return a $promise, with success/data or an error
     */
    this.read = function (obj, cache) {
      var requestResource = this.requestResource(obj);
      setActions('read', obj, cache);
      return requestResource.read({endpoint: obj.options.endpoint, limit: obj.options.limit, id: obj.id}).$promise;
    };

});
