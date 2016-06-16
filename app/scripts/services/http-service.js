'use strict';
/**
* @ngdoc service
* @name angularServicesApp.httpService
* @description
* # httpService
* # a service that abstracts $resource for simple and agnostic CRUD network calls.
* # any special treatment or data can be abstracted in factories.
* # will need some work to pass $token and $serverPath for Kronos Schedule.
* @requires $resource
*/
angular.module('angularServicesApp')
  .service('httpService', function ($resource) {

    var serverPath = 'http://localhost:4100/';

    var request = {
      'url': serverPath + ':name/:id',
      'actions': {
        'read': {
          'method': 'GET'
        },
        'create': {
          'method': 'POST'
        },
        'update': {
          'method': 'PUT'
        },
        'delete': {
          'method': 'DELETE'
        }
      },
      'parameters':{
        'name': '@name',
        'id': '@id'
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
     * httpService.create('asset', payload);
     * @param  {string} endpoint The name of the endpoint you'd like to create a record. *required
     * @param  {obj} payload Payload structured in the form expected by the API. *required
     * @return {httpPromise} The output will return a $promise, with success/data or an error
     */
    this.create = function (name, payload) {
      return requestResource.create({name: name}, payload).$promise;
    };

    /**
     * @ngdoc
     * @name httpService.delete
     * @methodOf angularServicesApp.httpService
     * @function
     * @description
     * Method to DELETE data through an API
     * @example
     * httpService.delete('asset', id);
     * @param  {string} endpoint The name of the endpoint of the record to delete. *required
     * @param  {int} id   The id or identifier of the specific record to delete. *required
     * @return {httpPromise} The output will return a $promise, with success/data or an error
     */
    this.delete = function(name, id) {
      return requestResource.delete({
        name: name,
        id: id
      }).$promise;
    };

    /**
     * @ngdoc
     * @name httpService.update
     * @methodOf angularServicesApp.httpService
     * @function
     * @description
     * Method to update data through an API
     * @example
     * httpService.update('asset', id, payload);
     * @param  {string} endpoint The name of the endpoint you'd like to update. *required
     * @param  {int} id   The id or identifier of the specific record to update. *required
     * @param  {obj} payload Payload structured in the form expected by the API. *required
     * @return {httpPromise} The output will return a $promise, with success/data or an error
     */
    this.update = function (name, id, payload) {
      return requestResource.update({name: name, id: id}, payload).$promise;
    };

    /**
     * @ngdoc
     * @name httpService.read
     * @methodOf angularServicesApp.httpService
     * @function
     * @description
     * Method to read data from an API
     * @example
     * httpService.read('asset', 1);
     * @param  {string} endpoint The name of the endpoint you'd like to access. *required
     * @param  {int} id   The id or identifier of the specific record to fetch. *optional
     * @return {httpPromise} The output will return a $promise, with success/data or an error
     */
    this.read = function (name, id) {
      if(!id){
        request.actions.read.isArray = true;
      } else{
        delete request.actions.read.isArray;
      }
      return requestResource.read({
        name: name,
        id: id
      }).$promise;
    };

});
