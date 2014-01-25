
angular.module('employeeApp')
.controller('OrderPurchaseOrderCreateCtrl', ['$scope', 'PurchaseOrder', 'Supplier', 'Supply', 'Notification', '$filter', '$timeout',
function ($scope, PurchaseOrder, Supplier, Supply, Notification, $filter, $timeout) {
	
	/*
	 * Setup vars
	 */
	$scope.showSuppliers = false;
	$scope.showSupplies = false;
	$scope.suppliers = Supplier.query({limit:0});
	$scope.po = new PurchaseOrder();
	$scope.po.items = [];
	
	/*
	 * Add a supplier to the purchase order
	 */
	$scope.addSupplier = function (supplier) {
		//Hide Modal
		$scope.showSuppliers = false;
		
		$scope.po.supplier = supplier;
		$scope.supplies = $filter('filter')(Supply.query({supplier_id:supplier.id}, function (response) {
			$scope.supplies = $filter('filter')(response, supplier.name);
		}), supplier.name);
	};
	
    /*
	 * Add an item to the purchase order
	 */
	$scope.addItem = function (item) {
		//Hide Modal
		$scope.showSupplies = false;
		var purchasedItem = angular.copy(item);
		
		delete purchasedItem.quantity;
		$scope.po.items.push(purchasedItem);
	};
	
	/*
	 * Remove an item fro the purchase order
	 */
	$scope.removeItem = function (index) {
		$scope.po.items.splice(index, 1);
	};
	
	/*
	 * Watch Items for change
	 * 
	 * We initially tests that the lengths are the same, 
	 * in order to eliminate add and subtracting items.
	 * 
	 * We then loop through all the items and find the item
	 * that has changed, and then we compare the costs and the id
	 * to ensure the the same item has change. The costs is saved, 
	 * and a reference object is made.
	 * 
	 * After a delay of 5 seconds, we compare the saved costs with the
	 * current item cost, by using a reference. 
	 */
	$scope.$watch('po.items', function (newVal, oldVal) {
		//Filter out changes in length
		if (newVal.length == oldVal.length && newVal.length > 1) {
			//Loop through all the items;
			for (var i=0; i < newVal.length; i++) {
				//Tests if the costs are different but the id is the same
				if (newVal[i].cost != oldVal[i].cost && newVal[i].id == oldVal[i].id) {
					var cost = newVal[i].cost;
					/*We make a reference to the original object, 
					 *So that we can make sure the price has settled
					 *in x milliseconds.*/
					var obj = newVal[i];
					$timeout(function () {
						//Tests to make sure the cost has settled
						if (obj.cost == cost) {
							var supply = obj.isPrototypeOf(Supply) ? obj : new Supply(obj);
							supply.$update();
						}
					}, 5000);
				}
				
				//if (po.items[i].cost == newVal[i].cost)
			}
		}
	}, true);
	
	/*
	 * Calculate the subtotal
	 */
	$scope.subtotal = function () {
		var subtotal = 0;
		for (var i=0; i<$scope.po.items.length; i++) {
			subtotal += (Number($scope.po.items[i].override_cost ? $scope.po.items[i].override_cost_amount : $scope.po.items[i].cost) * Number($scope.po.items[i].quantity || 1));
		}
		return subtotal.toFixed(2);
	};
	/*
	 * Calculate the total
	 */
	$scope.total = function () {
		
		var subtotal = Number($scope.subtotal());
		//Calculate vat
		var vat = subtotal * (Number($scope.po.vat || 0)/100);
		
		//Return subtotal + vat
		return (vat + subtotal);
	};
	/*
	 * Verfication of order
	 */
	$scope.verifyOrder = function () {
		if(!$scope.po.hasOwnProperty('supplier')) {
			return false;
		}
		
		if($scope.po.items.length <= 0) {
			return false;
		}
		
		return true;
	};
	
	/*
	 * Save the purchase order to the server
	 */
	$scope.save = function () {
		if($scope.verifyOrder()) {
			Notification.display('Creating purchase order...', false);
			$scope.po.$save(function (response) {
				try{
					window.open(response.pdf.url);
				}catch(e){
					console.warn(e);
				}
				Notification.display('Purchase order created.');
			}, function () {
				Notification.display('ooops');
			});
		}
	};
	
	/*
	 * Reset the order
	 */
	$scope.reset = function () {
		$scope.po = new PurchaseOrder();
		$scope.po.items = [];
	};
	
	
}]);
