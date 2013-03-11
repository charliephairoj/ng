//Controllers for order




/*
 * Acknowledgement Area
 */



//Create Acknowledgement
function CreateAcknowledgementCtrl($scope, Acknowledgement, Customer, Upholstery, Fabric, $filter, Notification){
    
    //Vars
    $scope.show_fabric = false;
    $scope.uploading = false;
   
    $scope.customerList = Customer.query();
    $scope.upholsteryList = Upholstery.query();
    $scope.fabricList = Fabric.query();
    $scope.ack = new Acknowledgement();
    
    var uploadTargets = [];
    
    
    
    $scope.addCustomer = function(index){
        //Set Customer
        $scope.ack.customer = $filter('orderBy')($filter('filter')($scope.customerList, $scope.queryCustomers), 'name')[index];
        
        //Hide Customer Panel
        $scope.showCustomers = false;
    };
    
    $scope.addUpholstery = function(index){
        
        //Create products array if not exists
        $scope.ack.products = $scope.ack.products || [];
        //Add New compy of product
        $scope.ack.products.push(angular.copy($filter('filter')($scope.upholsteryList, $scope.queryUpholstery)[index]));
        //Close Modal
        $scope.show_upholstery = false;
        $scope.show_quantity = true;
    };
    
    $scope.addCustomItem = function(){
        var item = {};
        angular.copy($scope.custom, item);
        item.is_custom = true;
        $scope.ack.products = $scope.ack.products || [];
        $scope.ack.products.push(item);
        //Reset input
        $scope.custom = {};
        //Close Modal
        $scope.showCustom = false;  
    };
    
    $scope.uploadImage = function(){
        //Display Notification
        Notification.display('Uploading Image', false);
        //Set the upload Target
        
        //Get new image and add to form data
        var image = $scope.images[0];
        var fd = new FormData();
        fd.append('image', image);
        $scope.uploading = true;
        //Upload the image
        jQuery.ajax("acknowledgement/item/image", {
           type:'POST',
           data:fd,
           processData:false,
           contentType:false,
           success: function(response){
               //Copy image to custom item
               $scope.custom = $scope.custom || {is_custom:true};
               $scope.custom.image = {};
               angular.copy(response, $scope.custom.image);
               //add subproperty so image can be viewed
               $scope.custom.url = $scope.custom.image.url;
               //Clear $scope of old Image
               $scope.images.length = 0;
               $scope.imagePreviews.length = 0;
               Notification.display('Image Uploaded');
               $scope.uploading = false;
               
           }
        });
    };
    
    
    $scope.removeProduct = function(index){
        $scope.ack.products.splice(index, 1);
    };
    
    $scope.create = function(){
        
        if($scope.isValidated()){
            Notification.display('Creating Acknowledgement...', false);
            var ack = new Acknowledgement();
            angular.copy($scope.ack, ack);
            //Add delivery date
            ack.delivery_date = {};
            ack.delivery_date.month = $scope.ack.delivery_date.getMonth()+1;
            ack.delivery_date.date = $scope.ack.delivery_date.getDate();
            ack.delivery_date.year = $scope.ack.delivery_date.getFullYear();
            console.log(ack);
            
            ack.$save(function(response){
                console.log(response);
                Notification.display('Acknowledgement created');
                window.open(response.acknowledgement_url);
                window.open(response.production_url);
            });
        }else{
            Notification.display('The Order is Not Complete')
        }
        
    };
    
    //Validations
    $scope.isValidated = function(){
        /*
         * The following are test to see if
         * The property has already been added
         */
        if(!$scope.ack.customer){
            return false;
        }
        if(!$scope.ack.products){
            return false;
        }
        if(!$scope.ack.vat){
            return false;
        }
        if(!$scope.ack.delivery_date){
            return false;
        }
        //Return true for form validated
        return true;
    }
    
}

CreateAcknowledgementCtrl.$inject = ['$scope', 'Acknowledgement', 'Customer', 'Upholstery', 'Fabric', '$filter', 'Notification'];


