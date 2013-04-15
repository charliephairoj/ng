'use strict';

angular.module('employeeApp')
  .controller('OrderAcknowledgementDetailsCtrl', ['$scope', 'Acknowledgement', '$routeParams', 'Notification', function ($scope, Acknowledgement, $routeParams, Notification) {
    Notification.display('Loading Acknowledgement...', false);
    $scope.showCal = false;
    $scope.acknowledgement = Acknowledgement.get({'id':$routeParams.id}, function(){
        Notification.display('Acknowledgement Loaded');
    });
    
    $scope.updateDeliveryDate = function(){
        $scope.showCal = false;
    };
    
    $scope.save = function(){
        Notification.display('Saving Acknowledgement...', false);
        $scope.acknowledgement.$save(function(){
            Notification.display('Acknowledgement '+$scope.acknowledgement.id+' Saved');
        });
    };
  }]);
