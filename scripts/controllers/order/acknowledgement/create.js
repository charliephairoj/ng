'use strict';

angular.module('employeeApp')
  .controller('OrderAcknowledgementCreateCtrl', ['$scope', 'Acknowledgement', 'Customer', 'Upholstery', 'Fabric', '$filter', 'Table', 'Notification',
    function ($scope, Acknowledgement, Customer, Upholstery, Fabric, $filter, Table, Notification) {
        //Vars
        $scope.showFabric = false;
        $scope.uploading = false;
        $scope.customImageScale = 100;
        $scope.customerList = Customer.poll().query();
        $scope.upholsteryList = Upholstery.poll().query();
        $scope.tableList = Table.poll().query();
        $scope.fabricList = Fabric.poll().query();
        $scope.ack = new Acknowledgement();
        
        var uploadTargets = [];
        var storage = window.localStorage;
        
        if(storage.getItem('acknowledgement-create')){
            angular.extend($scope.ack, JSON.parse(storage.getItem('acknowledgement-create')));
        }
        
        $scope.ack.products = $scope.ack.products || [];
        
        $scope.tempSave = function(){
            storage.setItem('acknowledgement-create', JSON.stringify($scope.ack));
        }
        
        $scope.addCustomer = function(customer){
            //Set Customer
            $scope.ack.customer = customer
            //Hide Customer Panel
            $scope.showCustomers = false;
        };
        
        $scope.addProduct = function(product){
            $scope.ack.products.push(product);
        }
        
        $scope.removeProduct = function(index){
            $scope.ack.products.splice(index, 1);
        };
        
        $scope.create = function(){
            $scope.tempSave();
            try{
                if($scope.isValidated()){
                    Notification.display('Creating Acknowledgement...', false);
                    $scope.ack.$save(function(response){
                        Notification.display('Acknowledgement created');
                        window.open(response.acknowledgement_url);
                        window.open(response.production_url);
                        angular.extend($scope.ack, JSON.parse(storage.getItem('acknowledgement-create')));
                    }, function(e){
                        console.log(e);
                        Notification.display('There an error in creating the Acknowledgement', false);
                    });
                }
            }catch(e){
                Notification.display(e.message);
            }
        };
        
        $scope.reset = function(){
            $scope.ack = new Acknowledgement;
            $scope.ack.products = [];
            storage.removeItem('acknowledgement-create');
        }
        
        //Validations
        $scope.isValidated = function(){
            /*
             * The following are test to see if
             * The property has already been added
             */
            if(!$scope.ack.customer){
                throw new TypeError("Customer is not an object");
            }else{
                if(!$scope.ack.customer.hasOwnProperty('id')){
                    throw new ReferenceError("Missin customer ID");
                }
            }
            if(!$scope.ack.products){
                throw new TypeError("Products is not an array");
            }else{
                if(!$scope.ack.products.length > 0){
                    throw new RangeError("No products added to the order");
                }else{
                    for(var i in $scope.ack.products){
                        if(!$scope.ack.products[i].hasOwnProperty('has_price')){
                            //throw new ReferenceError("Product missing 'has_price' attribute");
                        }else{
                            if(!$scope.ack.products[i].has_price){
                                //throw new TypeError("Product missing price");
                            }
                        }
                    }
                }
            }
            
            if($scope.ack.vat === undefined || $scope.ack.vat === null){
                throw new TypeError("Vat is not a number");
            }
            if(!$scope.ack.delivery_date){
                throw new TypeError("Delivery Date is not a valid Date type");
            }
            if(!$scope.ack.po_id){
                throw new TypeError("PO# is not defined");
            }
            //Return true for form validated
            return true;
        };
        
        $scope.$on('$destroy', function(){
            Customer.stopPolling();
            Upholstery.stopPolling();
            Fabric.stopPolling();
            Table.stopPolling();
        });
  }]);
