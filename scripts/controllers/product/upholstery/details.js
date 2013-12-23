
angular.module('employeeApp')
.controller('ProductUpholsteryDetailsCtrl', ['$scope', 'Upholstery', '$routeParams', 'Notification', '$location',
function ($scope, Upholstery, $routeParams, Notification, $location) {
    $scope.uphol = Upholstery.get({'id':$routeParams.id});    
    //Upload Image
    $scope.upload = function () {
        //Notify of uploading image
        Notification.display('Uploading Image...', false);
        var fd = new FormData();
        
        fd.append('image', $scope.images[0]);
		jQuery.ajax("/api/v1/upholstery/image", {
			type:'POST',
			data:fd,
			cache:false,
			processData:false,
			contentType:false,
			success: function(responseData){
				Notification.display('Image Updated');
				$scope.uphol.image = {};
				angular.copy(responseData, $scope.uphol.image);
				$scope.uphol.$update();
				$scope.imagePreviews = null;
				$scope.images = null;
				$scope.$apply();
			}
		});
	};
    
    $scope.update = function () {
        Notification.display('Saving Upholsterty...', false);
        $scope.uphol.$update(function() {
            Notification.display('Upholstery Saved');
        });
    };
    
    $scope.remove = function (){
        Notification.display('Deleteing Upholstery Product');
        $scope.uphol.$delete(function(){
            Notification.display('Upholstery Product Deleted');
            $location.path('/product/upholstery');
        });
    };
    
    $scope.$on('$destroy', function (){
        $scope.update(); 
    });
}]);
