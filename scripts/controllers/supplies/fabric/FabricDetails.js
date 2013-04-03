//Controllers for supplies




/*
 * Fabric Controllers
 */



function FabricDetailsCtrl($scope, Fabric, $routeParams, $location, Notification, $http){
    
    $scope.fabric = Fabric.get({'id':$routeParams.id});
    
    //Uploads Profie Image
    $scope.upload = function(){
        //display notification
        Notification.display('Uploading Image...', false);
        
        var fd = new FormData();
        
        fd.append('image', $scope.images[0]);
        
        //clear the form
        $scope.addLength = null;
        $scope.addRemark = null;
        
        jQuery.ajax("fabric/"+$scope.fabric.id+"/image", {
           type:'POST',
           data:fd,
           processData:false,
           contentType:false,
           success: function(responseData){
               //display success mesage
               Notification.display('Image Updated');
               console.log(responseData);
               $scope.fabric.image = {};
               angular.copy(responseData, $scope.fabric.image);
               $scope.fabric.$save();
               //Set new profile pic
               $scope.profileImageUrl = $scope.fabric.image.url;
               //Clear upload images and clear previews
               $scope.imagePreviews = null;
               $scope.images = null;
               $scope.$apply();
           }
        });
        
         
    };
    
    //Create fabric actions
    var DEFAULT_ACTIONS = ['reserve', 'add', 'subtract', 'reset'];
    function capitalizeFirstLetter(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    angular.forEach(DEFAULT_ACTIONS, function(name){
        $scope[name] = function(){
            //close modal
            $scope['show'+capitalizeFirstLetter(name)] = false;
            //Declare Ajax call vars
            var url = "fabric/"+$scope.fabric.id+"/"+name;
            var data = {lenght:$scope[name+'Length'], remark:$scope[name+'Remark']};
            //clear the form
            $scope[name+'Length'] = null;
            $scope[name+'Remark'] = null;
            //Ajax call
            $http.post(url, JSON.stringify(data)).success(function(data){
                //Reload the log
                $scope.viewLog();
                angular.copy(data, $scope.fabric);
                $scope.fabric.$save();
            });
        } 
    });
   
    $scope.viewLog = function(){
        
        $http.get("fabric/"+$scope.fabric.id+"/log").success(function(data){
                $scope.logs = $scope.logs || [];
                angular.copy(data, $scope.logs);
        });
    };
    
    
    $scope.remove = function(){
        //Notify
        Notification.display('Deleting Fabric...');
        
        //Ajax call to delete
        $scope.fabric.$delete(function(){
            //Notify
            Notification.display('Fabric Deleted');
            //Reroute to view page
            $location.path('/fabric');
        });
        
    };
    
    $scope.update = function(){
        Notification.display('Updating Fabric...', false)
        $scope.fabric.$save(Notification.display('Fabric Updated'));
    };
}

FabricDetailsCtrl.$inject = ['$scope', 'Fabric', '$routeParams', '$location', 'Notification', '$http'];


