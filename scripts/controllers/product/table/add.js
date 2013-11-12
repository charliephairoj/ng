'use strict';

angular.module('employeeApp')
    .controller('ProductTableAddCtrl', ['$scope', 'Table', 'Configuration', 'Model', 'Notification', '$location',
    function ($scope, Table, Configuration, Model, Notification, $location) {
        
        $scope.configurationList = Configuration.poll().query();
        $scope.modelList = Model.poll().query();
        $scope.table = new Table();
        
        //Text for tooltips
        $scope.modelText = "Choose a Model";
        $scope.configurationText = "Choose a Configuration";
        $scope.widthText = 'Enter a Width in millimeters';
        $scope.depthText = 'Enter a Depth in millimeters';
       
        $scope.upload = function(){
             //Notify of uploading image
             Notification.display('Uploading Image...', false);
             var fd = new FormData();
            
             fd.append('image', $scope.images[0]);
            
             //clear the form
             $scope.addLength = null;
             $scope.addRemark = null;
            
             jQuery.ajax("upholstery/image", {
                 type:'POST',
                 data:fd,
                 processData:false,
                 contentType:false,
                 success: function(responseData){
                     console.log(responseData);
                     Notification.display('Image Uploaded');
                     $scope.table.image = $scope.table.image || {};
                     angular.copy(responseData, $scope.table.image);
                     $scope.$apply();
                 }
            });
        };
        
        
        $scope.save = function(){
            Notification.display('Saving Table Product...');
            $scope.table.$create(function(){
                Notification.display('Table Product Saved');
                $location.path('/product/table');
            }); 
        };

        $scope.$on('$destroy', function(){
            Configuration.stopPolling();
            Model.stopPolling();
        });
    }]);
