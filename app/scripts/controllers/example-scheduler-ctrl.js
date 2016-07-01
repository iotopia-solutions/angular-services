'use strict';

/**
 * @ngdoc function
 * @name kronos.apps.services.controller:exampleSchedulerCtrl
 * @description
 * # exampleSchedulerCtrl
 * # An example controller for the kronos.apps.services
 */
var agGrid;

agGrid.initialiseAgGridWithAngular1(angular);

angular.module('kronos.apps.services')
  .controller('exampleSchedulerCtrl', function ($scope, dataService) {

    var $this = this;

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

   this.createEmployeeData = function(data){
     var response = [];
     angular.forEach(data, function(item){
       if (item.dto.employee){
         response.push(item.dto.employee);
       }
     });
     return response;
   };

   this.setupGrid = function(data){
     var start = performance.now();

     var columnDefs = [
       {headerName: "employeeId", field: "employeeId.id"},
       {headerName: "fullName", field: "fullName"},
       {headerName: "personNumber", field: "personNumber"},
       {headerName: "primaryJob", field: "primaryJob.name"}
     ];

     $scope.gridOptions = {
      columnDefs: columnDefs,
      rowData: data,
      enableSorting: true,
      enableFilter: true
     };

     var end = performance.now();
     console.log('setupGrid() finished in: ' + (end - start) + ' milliseconds.');
   };

   this.employeeDataSuccess = function(data){
     var start = performance.now();
     var array = dataService.deserializeArray(data);
     var grid = this.createEmployeeData(array);
     var end = performance.now();
     console.log('employeeDataSuccess() finished in: ' + (end - start) + ' milliseconds.');
     return this.setupGrid(grid);
   };

   this.employeeGrid = function(){
    var start = performance.now();
    var httpRequest = {
      options:{
        protocol: 'https',
        path: 'kronos-scheduler-demo.iotopia-solutions.com/page/wfc/bridge/ngui/schedule/rest/1.0',
        endpoint: 'subjectItems'
      }
    };
    dataService.http('read', httpRequest, true).then(function(data){
      var end = performance.now();
      console.log('employeeGrid + dataService.http() finished in: ' + (end - start) + ' milliseconds.');
      return $this.employeeDataSuccess(data);
    });
   };

});
