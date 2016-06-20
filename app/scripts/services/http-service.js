'use strict';
/**
* @ngdoc service
* @name kronos.apps.services.httpService
* @description
* # httpService
* # a service that abstracts $resource for simple and agnostic CRUD network calls.
* # any special treatment or data can be abstracted in factories.
* # will need some work to pass $token and $serverPath for Kronos Schedule.
* @requires $resource
*/
angular.module('kronos.apps.services')
  .service('httpService', function ($resource) {

    var request = {
      'url': 'http://' +'/:path' + '/:endpoint/:id',
      'actions': {
        'read': {
          'method': 'GET',
          'cache': true
        },
        'create': {
          'method': 'POST',
          'cache': true
        },
        'update': {
          'method': 'PUT',
          'cache': true
        },
        'delete': {
          'method': 'DELETE',
          'cache': true
        }
      },
      'parameters':{
        'path' : '@path',
        'endpoint': '@endpoint',
        'id': '@id',
        'limit' : '@limit'
      }
    };

    var requestResource = $resource(request.url, request.parameters, request.actions);

    /**
     * @ngdoc
     * @name httpService.create
     * @methodOf angularServicesApp.httpService
     * @function
     * @description
     * Method to create data through an API
     * @example
     * httpService.create(payload, {options:{path: 'localhost:4100', endpoint: 'assets'}});
     * @param {object} requestObj pass a request Object containing the following paramseters *required
     * @param  {object} requestObj.options set the path, endpoint and more in the future. *required
     * @param  {string} requestObj.options.path The path of the URL you'd like to access. *required
     * @param  {string} requestObj.options.endpoint The name of the endpoint you'd like to access. *required
     * @param  {object} requestObj.payload The data payload object per requirements of the api *required
     * @return {httpPromise} The output will return a $promise, with success/data or an error
     */
    this.create = function (obj) {
      return requestResource.create({path: obj.options.path, endpoint: obj.options.endpoint}, obj.payload).$promise;
    };

    /**
     * @ngdoc
     * @name httpService.delete
     * @methodOf angularServicesApp.httpService
     * @function
     * @description
     * Method to DELETE data through an API
     * @example
     * httpService.update({id: 43, options:{path: 'localhost:4100', endpoint: 'assets'}});
     * @param {object} requestObj pass a request Object containing the following paramseters *required
     * @param  {object} requestObj.options set the path, endpoint and more in the future. *required
     * @param  {string} requestObj.options.path The path of the URL you'd like to access. *required
     * @param  {string} requestObj.options.endpoint The name of the endpoint you'd like to access. *required
     * @param  {int} requestObj.id The id of the record you'd like to delete. *required
     * @return {httpPromise} The output will return a $promise, with success/data or an error
     */
    this.delete = function(obj) {
      return requestResource.delete({path: obj.options.path, endpoint: obj.options.endpoint, id: obj.id}).$promise;
    };

    /**
     * @ngdoc
     * @name httpService.update
     * @methodOf angularServicesApp.httpService
     * @function
     * @description
     * Method to update data through an API
     * @example
     * httpService.update({payload, options:{path: 'localhost:4100', endpoint: 'assets'}});
     * @param {object} requestObj pass a request Object containing the following paramseters *required
     * @param  {object} requestObj.options set the path, endpoint and more in the future. *required
     * @param  {string} requestObj.options.path The path of the URL you'd like to access. *required
     * @param  {string} requestObj.options.endpoint The name of the endpoint you'd like to access. *required
     * @param  {object} requestObj.payload   The data payload object per requirements of the api *required
     * @return {httpPromise} The output will return a $promise, with success/data or an error
     */
    this.update = function (obj) {
      return requestResource.update({path: obj.options.path, endpoint: obj.options.endpoint}, obj.payload).$promise;
    };

    /**
     * @ngdoc
     * @name httpService.read
     * @methodOf angularServicesApp.httpService
     * @function
     * @description
     * Method to read data from an API
     * @example
     * httpService.read({id: 401, options:{path: 'localhost:4100', endpoint: 'assets'}});
     * @param {object} requestObj pass a request Object containing the following paramseters *required
     * @param  {object} requestObj.options set the path, endpoint and more in the future. *required
     * @param  {string} requestObj.options.path The path of the URL you'd like to access. *required
     * @param  {string} requestObj.options.endpoint The name of the endpoint you'd like to access. *required
     * @param  {int=} requestObj.id   The id or identifier of the specific record to fetch.
     * @return {httpPromise} The output will return a $promise, with success/data or an error
     */
    this.read = function (obj) {
      if(!obj.id){
        request.actions.read.isArray = true;
      } else {
        delete request.actions.read.isArray;
      }
      return requestResource.read({path: obj.options.path, endpoint: obj.options.endpoint, limit: obj.options.limit, id: obj.id}).$promise;
    };

});
