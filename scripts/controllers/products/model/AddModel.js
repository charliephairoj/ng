function AddModelCtrl($scope, Model, Notification, $location){
  
    $scope.model = new Model();
    //Adds a new models
    $scope.save = function(model){
        Notification.display('Saving Model...', false);
        $scope.model.$save(function(){
            $location.path('/models');
            Notification.display('Model Saved'); 
            
        });
    };
   
    $scope.uploadImage = function(){
        //Notify of uploading image
        Notification.display('Uploading Image...', false);
        var fd = new FormData();
        
        fd.append('image', $scope.images[0]);
        
        //clear the form
        $scope.addLength = null;
        $scope.addRemark = null;
        
        jQuery.ajax("model/image", {
           type:'POST',
           data:fd,
           processData:false,
           contentType:false,
           success: function(responseData){
               Notification.display('Image Uploaded');
               $scope.model.image = $scope.model.image || {};
               angular.copy(responseData, $scope.model.image);
               $scope.$apply();
           }
        });
    };
}

AddModelCtrl.$inject = ['$scope', 'Model', 'Notification', '$location'];
