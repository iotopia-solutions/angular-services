'use strict';

/**
 * @ngdoc function
 * @name kronos.apps.services.controller:exampleHttpServiceCtrl
 * @description
 * # exampleHttpServiceCtrl
 * # An example controller for the kronos.apps.services
 */
angular.module('kronos.apps.services')
  .controller('exampleHttpServiceCtrl', function ($scope, dataService) {

    var $this = this;
    var serverPath = 'localhost:4100';
    /**
     * @ngdoc
     * @name exampleHttpServiceCtrl.setData
     * @methodOf angularServicesApp.controller:exampleHttpServiceCtrl
     * @function
     * @description
     * Method to set data in the controller, or in the $scope
     * @example
     * exampleHttpServiceCtrl.setData('assetList', Object, false)
     * @param  {string} name The name you'd like to set for your data.
     * @param  {data} data The data returned from an API.
     * @param  {boolean} scope Set the data in the $scope? True or False.
     */
    this.setData = function(name, data, scope){
      if(!name || !data){
        return;
      }
      if(scope){
        $scope[name] = angular.copy(data);
        return;
      }
      $this[name] = angular.copy(data);
    };

    this.clearData = function(name, scope){
      if(!name){
        return;
      }
      if(scope){
        delete $scope[name];
        return;
      }
      delete $this[name];
    };

    this.getList = function(scope){
      var httpRequest = {
        options:{
          path: serverPath,
          endpoint: 'assets',
          limit: 10
        }
      };
      dataService.http('read', httpRequest).then(function(data){
        $this.setData('assetsList', data, scope);
     });
    };

    this.getById = function(id){
     var httpRequest = {
       id: id,
       options:{
         path: serverPath,
         endpoint: 'assets'
       }
     };
     dataService.http('read', httpRequest).then(function(data){
       $this.setData('assetItem', data, false);
     });
   };




});
