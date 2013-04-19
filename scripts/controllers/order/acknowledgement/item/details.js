'use strict';

angular.module('employeeApp')
  .controller('OrderAcknowledgementItemDetailsCtrl', ['$scope', '$routeParams', 'AcknowledgementItem', 'Fabric',  
  function ($scope, $routeParams, AcknowledgementItem, Fabric) {
      $scope.fabricList = Fabric.query();
      $scope.item = AcknowledgementItem.get({id:$routeParams.id});
  }]);
