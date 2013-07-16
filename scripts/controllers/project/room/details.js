'use strict';

angular.module('employeeApp')
    .controller('ProjectRoomDetailsCtrl', ['$scope', 'Room', '$routeParams', 'ProjectItem', 'Notification', 
    function ($scope, Room, $routeParams, ProjectItem, Notification) {
        $scope.room = Room.poll().get({id:$routeParams.id});
        
        $scope.addProduct = function(product){
            //Notification of product add to which room
            Notification.display('Adding '+product.description+' to '+$scope.room.description, false);
            
            //Create item and set details
            var item = new ProjectItem();
            item.product = product;
            item.type = "product";
            item.room = {id:$scope.room.id};
            
            //Save the Item to the server
            item.$save(function(){
                Notification.display(item.description+' added to '+$scope.room.description, false);
                //Add item to current room on display
                $scope.room.items.push(item);    
            });
        }
        
        $scope.$on('$destroy', function(){
            Room.stopPolling(); 
        });
    }]);
