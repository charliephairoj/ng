'use strict';

angular.module('employeeApp')
  .controller('OrderShippingDetailsCtrl', ['$scope', 'Shipping', '$routeParams', 'Notification',
  function ($scope, Shipping, $routeParams, Notification) {
    Notification.display('Loading Shipping Manifest...', false);
    $scope.showCal = false;
    $scope.shipping = Shipping.get({'id':$routeParams.id}, function(){
        Notification.display('Shipping Manifest Loaded');
    });
    
    $scope.updateDeliveryDate = function(){
        $scope.showCal = false;
    };
    
    $scope.save = function(){
        Notification.display('Saving Shipping Manifest...', false);
        $scope.shipping.$save(function(){
            Notification.display('Shipping Manifest '+$scope.shipping.id+' Saved');
        });
    };
  }]);
