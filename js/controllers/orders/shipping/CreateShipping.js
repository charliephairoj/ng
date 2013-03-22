//Create Acknowledgement
function CreateShippingCtrl($scope, Acknowledgement, $filter, Notification, Shipping){
    
    $scope.ackList = Acknowledgement.query(function(){console.log($scope.ackList);});
    $scope.shipping = new Shipping();
    var ack;
    
    $scope.addAcknowledgement = function(index){
        //Set Customer
        ack = $filter('orderBy')($filter('filter')($scope.ackList, $scope.queryAck), 'name')[index];
        $scope.shipping.ack = {id:ack.id};
        $scope.shipping.customer = ack.customer;
        $scope.shipping.products = ack.products;
        $scope.shipping.deliveryDate = new Date(ack.delivery_date);
        console.log($scope.shipping);
        //Hide Customer Panel
        $scope.showAck = false;
    };
    
    
    
    $scope.create = function(){
        
        if($scope.isValidated()){
            Notification.display('Creating Acknowledgement...', false);
            /*
            var ack = new Acknowledgement();
            angular.copy($scope.ack, ack);
            //Add delivery date
            ack.delivery_date = {};
            ack.delivery_date.month = $scope.ack.delivery_date.getMonth()+1;
            ack.delivery_date.date = $scope.ack.delivery_date.getDate();
            ack.delivery_date.year = $scope.ack.delivery_date.getFullYear();
            console.log(ack);
            */
           $scope.shipping.delivery_date = $scope.shipping.deliveryDate.getTime();
            $scope.shipping.$save(function(response){
                console.log(response);
                Notification.display('Acknowledgement created');
                window.open(response.acknowledgement_url);
                window.open(response.production_url);
            });
        }else{
            Notification.display('The Order is Not Complete')
        }
        
    };
    
    $scope.removeProduct = function(index){
        $scope.shipping.products.splice(index, 1);
    };
    
    //Validations
    $scope.isValidated = function(){
        /*
         * The following are test to see if
         * The property has already been added
         */
        if(!$scope.shipping.ack){
            return false;
        }
        
        if(!$scope.shipping.deliveryDate){
            return false;
        }
        //Return true for form validated
        return true;
    }
    
}

CreateAcknowledgementCtrl.$inject = ['$scope', 'Acknowledgement', '$filter', 'Notification', 'Shipping'];


