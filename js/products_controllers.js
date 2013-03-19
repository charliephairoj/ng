//Controllers for Products

/*
 * Upholstery Area
 */
function ViewUpholCtrl($scope, Upholstery, Notification){
    Notification.display('Loading Upholstery...');
    $scope.upholList = Upholstery.query(function(){
        Notification.hide();
    });
    /*
    Poller.poll($scope, function(){
        $scope.poList = PurchaseOrder.query();

    });
    
    */
   
   
}

ViewUpholCtrl.$inject = ['$scope', 'Upholstery', 'Notification']
//controller to add lumber


function UpholDetailsCtrl($scope, Upholstery, $routeParams, Notification){
    $scope.uphol = Upholstery.get({'id':$routeParams.id});
    
    
    //Upload Image
    $scope.upload = function(){
        
        //Notify of uploading image
        Notification.display('Uploading Image...', false);
        var fd = new FormData();
        
        fd.append('image', $scope.images[0]);
        
      
        
        jQuery.ajax("upholstery/image", {
           type:'POST',
           data:fd,
           cache:false,
           processData:false,
           contentType:false,
           success: function(responseData){
               
               Notification.display('Image Updated');
               
               $scope.uphol.image = {};
               angular.copy(responseData, $scope.uphol.image)
               
               $scope.uphol.$save(console.log($scope.uphol));
               
               $scope.imagePreviews = null;
               $scope.images = null;
               
               $scope.$apply();
           }
        });
    };
}

UpholDetailsCtrl.$inject = ['$scope', 'Upholstery', '$routeParams', 'Notification']

