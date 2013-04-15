'use strict';

angular.module('employeeApp')
    .controller('ProductUpholsteryViewCtrl', ['$scope', 'Upholstery', 'Notification', function ($scope, Upholstery, Notification) {
        Notification.display('Loading Upholstery...');
        $scope.upholList = Upholstery.poll().query(function(){
            Notification.hide();
        });
        $scope.$on('$destroy', function(){
            Upholstery.stopPolling();
        });
   
    }]);
