'use strict';

angular.module('employeeApp')
  .controller('SupplyPropViewCtrl', ['$scope', 'Supply', function ($scope, Supply) {
    $scope.supplyList = Supply.poll().query({type:'prop'});
    $scope.$on('$destroy', function(){
        Supply.stopPolling();
    });
    
    $scope.upload = function(index, image){
        console.log(index);
        console.log(image);
    };
    
  }]);
