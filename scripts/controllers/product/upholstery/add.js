'use strict';

angular.module('employeeApp')
    .controller('ProductUpholsteryAddCtrl', ['$scope', 'Model', 'Configuration', 'Upholstery', 'Notification', '$location',
    function ($scope, Model, Configuration, Upholstery, Notification, $location) {
        $scope.modelList = Model.query();
        $scope.configurationList = Configuration.query();
        $scope.upholstery = new Upholstery();
        
        $scope.save = function(){
            Notification.display('Saving Upholstery Product...');
            $scope.upholstery.$save(function(){
                Notification.display('Upholstery Product Saved');
                $location.path('/product/upholstery');
            }); 
        };
    }]);
