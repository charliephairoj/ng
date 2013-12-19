
angular.module('employeeApp')
.controller('OrderAcknowledgementCreateCtrl', ['$scope', 'Acknowledgement', 'Customer', '$filter', 'Notification',
function ($scope, Acknowledgement, Customer, $filter, Notification) {
    //Vars
    $scope.showFabric = false;
    $scope.uploading = false;
    $scope.customImageScale = 100;
  
    $scope.ack = new Acknowledgement();
    
    var uploadTargets = [];
    var storage = window.localStorage;
    
    if (storage.getItem('acknowledgement-create')) {
        angular.extend($scope.ack, JSON.parse(storage.getItem('acknowledgement-create')));
    }
    
    $scope.ack.items = $scope.ack.items || [];
    $scope.employee = {id:$scope.currentUser.id};
    
    $scope.tempSave = function () {
        storage.setItem('acknowledgement-create', JSON.stringify($scope.ack));
    };
    
    $scope.addCustomer = function (customer) {
        //Set Customer
        $scope.ack.customer = customer;
        //Hide Customer Panel
        $scope.showCustomers = false;
        $scope.tempSave();
    };
    
    $scope.addItem = function (product) {
        $scope.ack.items.push(product);
        $scope.tempSave();
    };
    
    $scope.removeItem = function (index) {
        $scope.ack.items.splice(index, 1);
        $scope.tempSave();
    };
    
    $scope.create = function () {
		$scope.ack.employee = $scope.currentUser;
        $scope.tempSave();
        try {
            if ($scope.isValidated()) {
                Notification.display('Creating Acknowledgement...', false);
                $scope.ack.$create(function (response) {
                    Notification.display('Acknowledgement created');
                    window.open(response.pdf.acknowledgement);
                    window.open(response.pdf.production);
                    angular.extend($scope.ack, JSON.parse(storage.getItem('acknowledgement-create')));
                }, function (e) {
                    console.error(e);
                    Notification.display('There an error in creating the Acknowledgement', false);
                });
            }
        } catch (e) {
            Notification.display(e.message, false);
			throw new Error(e);
        }
    };
    
    $scope.reset = function () {
        $scope.ack = new Acknowledgement();
        $scope.ack.items = [];
        storage.removeItem('acknowledgement-create');
    };
    
    //Validations
    $scope.isValidated = function () {
        /*
         * The following are test to see if
         * The property has already been added
         */
        if (!$scope.ack.customer) {
            throw new TypeError("Customer is not an object");
        } else {
            if (!$scope.ack.customer.hasOwnProperty('id')) {
                throw new ReferenceError("Missin customer ID");
            }
        }
        if (!$scope.ack.items) {
            throw new TypeError("Products is not an array");
        } else {
            if ($scope.ack.items.length <= 0) {
                throw new RangeError("No products added to the order");
            } else {
                for (var i=0; i<$scope.ack.items.length; i++) {
                    /*
                     * Check that there is a quantity 
                     * for each piece of product
                     */
                    if (!$scope.ack.items[i].hasOwnProperty('quantity') || !$scope.ack.items[i].quantity) {
                        throw new RangeError("Expecting a quantity of at least 1 for "+$scope.ack.items[i].description);
                    }
                    if (!$scope.ack.items[i].hasOwnProperty('has_price')) {
                        //throw new ReferenceError("Product missing 'has_price' attribute");
                    } else {
                        if (!$scope.ack.items[i].has_price) {
                            //throw new TypeError("Product missing price");
                        }
                    }
                }
            }
        }
        
        if ($scope.ack.vat === undefined || $scope.ack.vat === null) {
            throw new TypeError("Vat is not a number");
        }
        if (!$scope.ack.delivery_date) {
            throw new TypeError("Delivery Date is not a valid Date type");
        }
        if (!$scope.ack.po_id) {
            throw new TypeError("PO# is not defined");
        }
        //Return true for form validated
		return true;
	};
        
}]);
