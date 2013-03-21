//Create Acknowledgement
function CreateShippingCtrl($scope, Acknowledgement, $filter, Notification, Shipping){
    
    $scope.ackList = Acknowledgement.query(function(){console.log($scope.ackList);});
    $scope.shipping = new Shipping();
    var ack;
    $scope.addAcknowledgement = function(index){
        //Set Customer
        ack = $filter('orderBy')($filter('filter')($scope.ackList, $scope.queryAck), 'name')[index];
        console.log(ack);
        $scope.shipping.customer = ack.customer;
        $scope.shipping.products = ack.products;

        //Hide Customer Panel
        $scope.showAck = false;
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
        if(!$scope.ack){
            return false;
        }
        
        if(!$scope.shipping.delivery_date){
            return false;
        }
        //Return true for form validated
        return true;
    }
    
}

CreateAcknowledgementCtrl.$inject = ['$scope', 'Acknowledgement', '$filter', 'Notification', 'Shipping'];


