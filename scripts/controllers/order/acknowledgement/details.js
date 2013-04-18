'use strict';

angular.module('employeeApp')
  .controller('OrderAcknowledgementDetailsCtrl', ['$scope', 'Acknowledgement', '$routeParams', 'Notification', '$http', 
  function ($scope, Acknowledgement, $routeParams, Notification, $http) {
    Notification.display('Loading Acknowledgement...', false);
    $scope.showCal = false;
    $scope.acknowledgement = Acknowledgement.get({'id':$routeParams.id}, function(){
        Notification.display('Acknowledgement Loaded');
    });
    
    $scope.getPDF = function(type) {
        Notification.display('Retrieving PDF...', false);
        $http.get("acknowledgement/"+$scope.acknowledgement.id+"/pdf", {params:{type:type}}).
            success(function(response){
                Notification.hide();
                window.open(response.url);
            });
    };
    
    $scope.save = function(){
        Notification.display('Saving Acknowledgement...', false);
        $scope.acknowledgement.$save(function(){
            Notification.display('Acknowledgement '+$scope.acknowledgement.id+' Saved');
        });
    };
  }]);
