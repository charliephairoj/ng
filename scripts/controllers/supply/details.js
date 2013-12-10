
angular.module('employeeApp')
.controller('SupplyDetailsCtrl', ['$scope', '$routeParams', 'Notification', 'Supply',
function ($scope, $routeParams, Notification, Supply) {
	
	Notification.display('Retrieving supply...', false);
	
	$scope.showQuantity = false;
	$scope.supply = Supply.get({'id':$routeParams.id}, function () {
		Notification.hide();	
	});
	
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
	
	/*
	 * Update the supply
	 * 
	 * Sends a PUT request to the server with all the values
	 * of the entire resource
	 */
	$scope.update = function () {
		Notification.display('Updating '+$scope.supply.description+'...', false);
		$scope.supply.$update(function () {
			Notification.display($scope.supply.description+' updated.');
		});
	};
	
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
		$scope.update();
	});
}]);
