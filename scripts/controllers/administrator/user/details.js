
angular.module('employeeApp')
.controller('AdministratorUserDetailsCtrl', ['$scope', 'Group', 'User', '$routeParams', '$location', '$http', 'Notification',
function ($scope, Group, User, $routeParams, $location, $http, Notification) {
    
    function indexById(list, item){
        if(!list.hasOwnProperty('length')){
            throw new TypeError("Expecting an Array");
        }
        if(typeof(item) == 'object'){
            if(!item.hasOwnProperty('id')){
                throw new TypeError('Expecting an id property for argument 2');
            }
        }
        
        //Set the id var
        var id = typeof(item) == 'object' ? item.id : item;
        for(var i in list){
            if(list[i].id == id){
                return i;
            }
        }
        
        return -1;
    }
    
    function merge(list1, list2){
        for(var i in list1){
            for(var h in list2){
                if(list1[i].id == list2[h].id){
                    list1[i].$checked = true;
                }
                
            }
        }
    }
  
    $scope.groupList = Group.query({limit:0}, function(){
        merge($scope.groupList, $scope.user.groups);
    });
    $scope.user = User.get({'id':$routeParams.id}, function(){
        merge($scope.groupList, $scope.user.groups);
    });
    
    
    
    $scope.changePassword = function(){
        var url = "/user/"+$scope.user.id+"/change_password";
        $http.post(url, $scope.password).success(function(e){
            Notification.display('Password successfully changed');
            $scope.password = {};
            $scope.showChangePassword = false;
        }).error(function(err){
			console.log(err);
		});
    };
    
    $scope.updateGroup = function(group){
        
        if(group.$checked){
            if(indexById($scope.user.groups, group) == -1){
                $scope.user.groups.push(angular.copy(group));
            }
        }else{
            var index = indexById($scope.user.groups, group);
            if(index > -1){
                $scope.user.groups.splice(index, 1); 
            }
        }
        //Save the model
        Notification.display('Updating '+$scope.user.username+'...', false);
        $scope.user.$update(function(response){
            Notification.display($scope.user.username+' updated.');
        });
    };
    
    $scope.remove = function(){
        $scope.user.$delete(function(){
            $location.path("/users");
        });
    };
    
    $scope.update = function(){
        $scope.user.$update();
    };
    
    $scope.$on('$destroy', function(){
        $scope.user.$update(); 
    });

}]);
