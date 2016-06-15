'use strict';

/**
 * @ngdoc function
 * @name angularServicesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * # An example controller for the angularServicesApp
 */
angular.module('angularServicesApp')
  .controller('MainCtrl', function ($scope, httpService) {

    var $this = this;

    /**
     * @ngdoc
     * @name MainCtrl.setData
     * @methodOf angularServicesApp.controller:MainCtrl
     * @function
     * @description
     * Method to set data in the controller, or in the $scope
     * @example
     * httpService.post('asset', id, payload);
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

    this.errorHandler = function(data){
      console.log(data, 'error');
    };

    this.setList = function(apiResponse){
      if(apiResponse && apiResponse.length){
        $this.setData('assetsList', apiResponse, false);
      }
    };

    this.setListScope = function(apiResponse){
      if(apiResponse && apiResponse.length){
        $this.setData('assetsList', apiResponse, true);
      }
    };

    this.setItem = function(apiResponse){
      if(apiResponse){
        $this.setData('assetItem', apiResponse, false);
      }
    };

    this.getList = function(scope){
      var setter = scope ? this.setListScope : this.setList;
      return httpService.read('assets').then(setter, this.errorHandler);
    };

    this.getById = function(id){
     return httpService.read('assets', id).then(this.setItem, this.errorHandler);
    };

});
