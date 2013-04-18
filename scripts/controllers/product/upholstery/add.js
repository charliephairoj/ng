'use strict';

angular.module('employeeApp')
    .controller('ProductUpholsteryAddCtrl', ['$scope', 'Model', 'Configuration', 'Upholstery', 'Notification', '$location',
    function ($scope, Model, Configuration, Upholstery, Notification, $location) {
        $scope.modelList = Model.query();
        $scope.configurationList = Configuration.query();
        $scope.upholstery = new Upholstery();
        
        //Text for tooltips
        $scope.modelText = "Choose a Model";
        $scope.configurationText = "Choose a Configuration";
        $scope.widthText = 'Enter a Width in millimeters';
        $scope.depthText = 'Enter a Depth in millimeters';
        $scope.bpText = 'Enter the number of Back Pillows';
        $scope.apText = 'Enter the number of Accent Pillows';
        $scope.lpText = 'Enter the number of Lumbar Pillows';
        $scope.cpText = 'Enter the number of Corner Pillows';
        
        
        $scope.save = function(){
            Notification.display('Saving Upholstery Product...');
            $scope.upholstery.$save(function(){
                Notification.display('Upholstery Product Saved');
                $location.path('/product/upholstery');
            }); 
        };
    }]);
