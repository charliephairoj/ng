'use strict';

angular.module('employeeApp')
  .controller('OrderShippingDetailsCtrl', ['$scope', 'Shipping', '$routeParams', 'Notification', '$http',
  function ($scope, Shipping, $routeParams, Notification, $http) {
    Notification.display('Loading Shipping Manifest...', false);
    $scope.showCal = false;
    $scope.shipping = Shipping.get({'id':$routeParams.id}, function(){
        Notification.display('Shipping Manifest Loaded');
    });
    
    $scope.updateDeliveryDate = function(){
        $scope.showCal = false;
    };
    
    $scope.getPDF = function(type) {
        Notification.display('Retrieving PDF...', false);
        $http.get("shipping/"+$scope.shipping.id+"/pdf").
            success(function(response){
                Notification.hide();
                window.open(response.url);
            });
    };
    
    $scope.save = function(){
        Notification.display('Saving Shipping Manifest...', false);
        $scope.shipping.$save(function(){
            Notification.display('Shipping Manifest '+$scope.shipping.id+' Saved');
        });
    };
  }]);
