
angular.module('employeeApp')
.controller('SupplyDetailsCtrl', ['$scope', '$routeParams', 'Notification', 'Supply', '$timeout', '$location', 'scanner',
function ($scope, $routeParams, Notification, Supply, $timeout, $location, scanner) {
	
	Notification.display('Retrieving supply...', false);
	
	/*
	 * Vars
	 */
	$scope.action = 'subtract';
	$scope.showQuantity = false;
	$scope.supply = Supply.get({'id':$routeParams.id}, function () {
		Notification.hide();	
	});
	globalScanner.disable();
	var updateLoopActive = false,
		timeoutPromise;
	var validWidth = ['m', 'yd', 'pc', 'pack', 'container', 'fabric'];
	var validDepth = ['pc', 'pack', 'container'];
	var validHeight = ['pack', 'pc'];
	/*
	 * Seletively show dimensions
	 */
	$scope.showWidth = function () {
		
		return validWidth.indexOf($scope.supply.units) > -1 || 
		validWidth.indexOf($scope.supply.type) > -1 ||
		($scope.supply.units == 'kg' && $scope.supply.type == 'packaging') ? true : false;
	};
	
	$scope.showDepth = function () {
		return validDepth.indexOf($scope.supply.units) > -1 ? true : false;
	};
	
	$scope.showHeight = function () {
		return validHeight.indexOf($scope.supply.units) > -1 ||
		($scope.supply.units == 'kg' && $scope.supply.type == 'packaging') ? true : false;
	};
	
	$scope.addImage = function (image) {
		$scope.supply.image = image;
	};
	
	scanner = new scanner('supply/details');
	//scanner.enable();
	scanner.disableStandard();
	scanner.register(/^\d+(\-\d+)*$/, function (code) {
		$scope.safeApply(function () {
			$scope.selectedSupplier.upc = code;
			$scope.showAddUPC = false;
		});
	});
	/*
	 * Update the supply
	 * 
	 * Sends a PUT request to the server with all the values
	 * of the entire resource. We implement this by watching the supply
	 * object. 
	 * 
	 * We utilize a custom listener function because we must delete, 
	 * all dynamically generated content from the server, such as 
	 * last_modifed, and unique url, as this will cause a loop
	 * when the updating begins
	 */
	$scope.$watch(function () {
		var supply = angular.copy($scope.supply);
		delete supply.last_modified;
		delete supply.image;
		delete supply.supplier;
		return supply;
	}, function (newVal, oldVal) {
		if (!updateLoopActive && oldVal.hasOwnProperty('id')) {
			updateLoopActive = true;
			timeoutPromise = $timeout(function () {
				Notification.display('Updating '+$scope.supply.description+'...', false);
				var supply = angular.copy($scope.supply);
				supply.$update(function () {
					updateLoopActive = false;
					Notification.display($scope.supply.description+' updated');
				}, function () {
					Notification.display("There was an error in updating "+$scope.supply.description);
				});
			}, 5000);
		}
	}, true);
	
	/*
	 * Adding a upc
	 * 
	 * Set Keyboard Navigation
	 * Detects the switch and opens the modal accordingly
	 * 
	 */
	$scope.$watch('showAddUPC', function (newVal, oldVal) {
		if (newVal) {
			scanner.enable();
		} else {
			scanner.disable();
		}
	});
	/*
	 * Add a quantity
	 * 
	 * Sends a POST request to the server via the add url with 
	 * the quanttity as a parameter
	 */
	$scope.add = function (quantity) {
		$scope.showQuantity = false;
		if (!quantity) {
			quantity = $scope.quantity;
		}
		
		$scope.supply.$add({quantity:quantity}, function () {
			
		});
	};
	
	/*
	 * Subtract a quantity
	 * 
	 * Sends a POST reques to the server via the subtract url with the 
	 * quantity as a parameter
	 */
	$scope.subtract = function (quantity) {
		$scope.showQuantity = false;
		if (!quantity) {
			quantity = $scope.quantity;
		}
		
		$scope.supply.$subtract({quantity:quantity}, function () {
			
		});
	};
	
	/*
	 * Change quantity
	 */
	$scope.changeQuantity = function (action, quantity) {
		if (!quantity) {
			throw ValueError("Expecting a quantity");
		}
		$scope[action]();
		
	};
	
	$scope.$on('$destroy', function () {
		//Turn off scanner and keyboard Navigation
		scanner.disable();
		$timeout.cancel(timeoutPromise);
		Notification.display('Updating '+$scope.supply.description+'...', false);
		$scope.supply.$update(function () {
			Notification.display($scope.supply.description+' updated.');
		});
		globalscanner.enable();
	});
	
	/*
	 * Remove
	 */
	$scope.remove = function () {
		if ($scope.currentUser.hasPermission('delete_supply')) {
			Notification.display('Deleting supply...', false);
			$scope.supply.$delete(function () {
				Notification.display('Supply deleted');
				$location.path('/supply');
			});
		}
	};
}]);
