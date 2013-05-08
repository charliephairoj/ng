'use strict';

angular.module('employeeApp')
  .controller('OrderShippingCreateCtrl', ['$scope', 'Acknowledgement', '$filter', 'Notification', 'Shipping', '$location', 'scanner',     
  function ($scope, Acknowledgement, $filter, Notification, Shipping, $location, scanner) {
    $scope.ackList = Acknowledgement.query(function(){console.log($scope.ackList);});
    $scope.shipping = new Shipping();
    var ack;
    
    scanner.onscan = function(code){
        Notification.display('Retrieving Acknowledgement# '+code.split('-')[1], false);
        var re = new RegExp(/^A\-(s+)?/);
        if(re.test(code)){
            Acknowledgement.get({id:code.split('-')[1]}, function(response){
                Notification.hide();
                var ack = response;
                $scope.shipping.acknowledgement = {id:ack.id};
                $scope.shipping.customer = ack.customer;
                $scope.shipping.products = ack.products;
                $scope.shipping.delivery_date = new Date(ack.delivery_date);
            },
            function(){
                Notifcation.display('Unable to locate Acknowledgement#'+code.split('-')[1]);
            });
        }
        
    }
    
    $scope.addAcknowledgement = function(index){
        //Set Customer
        ack = $filter('orderBy')($filter('filter')($scope.ackList, $scope.queryAck), '-id')[index];
        $scope.shipping.acknowledgement = {id:ack.id};
        $scope.shipping.customer = ack.customer;
        $scope.shipping.products = ack.products;
        $scope.shipping.delivery_date = new Date(ack.delivery_date);
        //Hide Customer Panel
        $scope.showAck = false;
    };
    
    
    
    $scope.create = function(){
        
        if($scope.isValidated()){
            Notification.display('Creating Acknowledgement...', false);
            $scope.shipping.$save(function(response){
                console.log(response);
                Notification.display('Shipping manifest created');
                window.open(response.url);
                $location.path('/order/shipping');
            }, 
            function(){
                Notification.display('There was an error in creating the shipping manifest', false);
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
        if(!$scope.shipping.acknowledgement){
            return false;
        }
        
        if(!$scope.shipping.delivery_date){
            return false;
        }
        //Return true for form validated
        return true;
    };
    
    $scope.$on('$destroy', function(){
        scanner.onscan = null; 
    });
  }]);
