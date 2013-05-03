'use strict';

angular.module('employeeApp')
  .controller('OrderAcknowledgementItemDetailsCtrl', ['$scope', '$routeParams', 'AcknowledgementItem', 'Fabric', 'Notification',  
  function ($scope, $routeParams, AcknowledgementItem, Fabric, Notification) {
      $scope.fabricList = Fabric.query();
      $scope.item = AcknowledgementItem.get({id:$routeParams.id});
      
      $scope.save = function(){
          Notification.display('Saving' + $scope.item.description + '...', false);
          $scope.item.$save(function(){
              Notification.display($scope.item.description + ' saved');
          }, function(){
              Notification.display("There was an error in saving "+$scope.item.description, false);
          });
      };
      
      
  }]);
