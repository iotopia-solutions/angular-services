'use strict';
/**
* @ngdoc service
* @name kronosAngularServicesApp.httpService
* @description
* # httpService
* # a service that abstracts $resource for simple and agnostic network calls.
* # any special treatment or data can be abstracted in factories.
* # will need some work to pass $token and $serverPath for Kronos Schedule.
* @requires $resource
*/
angular.module('kronosAngularServicesApp')
  .service('httpService', function ($resource) {

    var serverPath = 'http://localhost:4100/';

    var request = {
      url: serverPath + ':name/:id',
      actions: {
        get: {
          method: 'GET'
        },
        getList: {
          method: 'GET',
          isArray: true
        },
        post: {
          method: 'POST'
        },
        patch: {
          method: 'PATCH'
        },
        delete: {
          method: 'DELETE'
        }
      },
      parameters:{
        name: '@name',
        id: '@id'
      }
    };

    var requestResource = $resource(request.url, request.parameters, request.actions);

    /**
     * @ngdoc
     * @name httpService.get
     * @methodOf kronosAngularServicesApp.httpService
     * @function
     * @description
     * Method to GET (fetch) a record from an API
     * @example
     * httpService.get('asset', 1);
     * @param  {string} name The name of the records you'd like to fetch.
     * @param  {int} id   The id or identifier of the specific record to fetch.
     * @return {response}     The response will be from the server, with data or failure.
     */
    this.get = function (name, id) {
      return requestResource.get({
        name: name,
        id: id
      }).$promise;
    };

    /**
     * @ngdoc
     * @name httpService.getList
     * @methodOf kronosAngularServicesApp.httpService
     * @function
     * @description
     * Method to GET (fetch) a list of records from an API
     * @example
     * httpService.getList('asset');
     * @param  {string} name The name of the records you'd like to fetch.
     * @return {response}     The response will be from the server, with data or failure (Array).
     */
    this.getList = function (name) {
      return requestResource.getList({
        name: name
      }).$promise;
    };

    /**
     * @ngdoc
     * @name httpService.post
     * @methodOf kronosAngularServicesApp.httpService
     * @function
     * @description
     * Method to POST (create) data through an API
     * @example
     * httpService.post('asset', payload);
     * @param  {string} name The name of the records you'd like to update.
     * @param  {obj} payload Payload structured in the form expected by the API.
     * @return {response}     The response will be from the server, with an id, and success or failure.
     */
    this.post = function (name, payload) {
      return requestResource.post({name: name}, payload).$promise;
    };

    /**
     * @ngdoc
     * @name httpService.patch
     * @methodOf kronosAngularServicesApp.httpService
     * @function
     * @description
     * Method to PATCH (update) data through an API
     * @example
     * httpService.patch('asset', id, payload);
     * @param  {string} name The name of the record you'd like to update.
     * @param  {int} id   The id or identifier of the specific record to update.
     * @param  {obj} payload Payload structured in the form expected by the API.
     * @return {response}     The response will be from the server, with an id, and success or failure.
     */
    this.patch = function (name, id, payload) {
      return requestResource.patch({name: name, id: id}, payload).$promise;
    };

    /**
     * @ngdoc
     * @name httpService.delete
     * @methodOf kronosAngularServicesApp.httpService
     * @function
     * @description
     * Method to DELETE data through an API
     * @example
     * httpService.delete('asset', id);
     * @param  {string} name The name of the record you'd like to delete.
     * @param  {int} id   The id or identifier of the specific record to delete.
     * @return {response}     The response will be from the server, with an id, and success or failure.
     */
    this.delete = function(name, id) {
      return requestResource.delete({
        name: name,
        id: id
      }).$promise;
    };

});
