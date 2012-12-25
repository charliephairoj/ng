//Controllers for order


/*
 * Lumber Area
 */

//controller to view po

function ChangePasswordCtrl($scope){
    
    $scope.changePassword = function(){
        var fd = new FormData(), 
                    
        data={
            'old':$scope.password.old,
            'newPass':$scope.password.newPass,
            'repeatPass':$scope.password.repeatPass
            
        };
        
        fd.append('data', JSON.stringify(data));
        
        jQuery.ajax("auth_service/change_password", {
                    type:"POST",
                    processData:false,
                    contentType:false,
                    data:fd,
                    success: function(responseData, status){
                        //create a resource from the data
                        var resource = new Resource(responseData);
                        
                        
                        //save new item to storage
                        storage.save(resource);
                        
                        //deep copy to this
                        angular.copy(resource, this);
                        //call the call back
                        if(callback){
                            console.log('calling')
                            callback(responseData);
                            $scope.$apply();
                        }
                        
                    }.bind(this)
                });
    }
    
    
}

ChangePasswordCtrl.$inject = ['$scope']
//controller to add lumber


