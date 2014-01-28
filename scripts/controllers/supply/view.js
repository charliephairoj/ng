
angular.module('employeeApp')
.controller('SupplyViewCtrl', ['$scope', 'Supply', 'Notification', '$filter', 'KeyboardNavigation', '$rootScope', '$location', '$http',
function ($scope, Supply, Notification, $filter, KeyboardNavigation, $rootScope, $location, $http) {

	/*
	* Vars and flags
	*/
	var fetching = true,
		index = 0,
		currentSelection;

	//system message
	Notification.display('Loading supplies...', false);

	$http.get('/api/v1/supply/type').success(function (response) {
		$scope.types = response;
		$scope.types.splice($scope.types.indexOf(null), 1);
	});
	
	$scope.supplies = Supply.query(function(){
		fetching = false;
		Notification.hide();
		changeSelection(index);
	});

	/*
	* Search mechanism
	* 
	* This function will send a GET request to the server
	* whenever the query string changes and that string will 
	* be sent along as a parameter. 
	*/
	$scope.$watch('query', function (q) {
		if (q) {
			Supply.query({limit:10, q:q}, function (resources) {
				for (var i=0; i<resources.length; i++) {
					if ($scope.supplies.indexOfById(resources[i].id) == -1) {
						$scope.supplies.push(resources[i]);
					}
				}
				index = 0;
				changeSelection(index);
			});
		}
	});

	/*
	* Load more supplies
	* 
	* This function will load more supplies from the server
	* be using the current number of supplies as the offset
	*/
	$scope.loadNext = function () {
		if (!fetching) {
			Supply.query({
				offset: $scope.supplies.length,
				limit: 50
			}, function (resources) {
				for (var i=0; i<resources.length; i++) {
					$scope.supplies.push(resources[i]);
				}
			});
		}
	};
	
	function filter(array) {
		return $filter('filter')($scope.supplies, $scope.query);
	}
			
	function changeSelection(i) {
				
		$rootScope.safeApply(function () {
			if (currentSelection) {
				currentSelection.$selected = false;
			}
			
			currentSelection = filter($scope.supplies)[i];
			
			if (currentSelection) {
				currentSelection.$selected = true;
			}
		});
	
		var selection = $('.item.selected');
		var container = selection.parents('.outer-container');
		var scrollTop = container.scrollTop();
		var cHeight = container.innerHeight();
		
		
		if (scrollTop > (selection.outerHeight() * i)) {
			container.scrollTop(selection.outerHeight() * i);
		} else if( (scrollTop + cHeight) < (selection.outerHeight() * i)) {
			container.scrollTop(selection.outerHeight() * i);
		}
				
	}
	
	var keyboardNav = new KeyboardNavigation();
			
	keyboardNav.ondown = function () {
		if (index < filter($scope.supplies).length - 1) {
			index += 1;
			changeSelection(index);
		}
	};
	
	keyboardNav.onup = function () {
		if (index !== 0) {
			index -= 1;
			changeSelection(index);
		}
	};
	
	keyboardNav.onenter = function () {
		$rootScope.safeApply(function () {
			$location.path('/supply/'+currentSelection.id);
		});
	};
	
	keyboardNav.enable();
	
	/*
	 * When adding suppliers or supply
	 * disable the keyboard navigation
	 */
	$scope.$watch('showAddSupply', function (val, oldVal) {
		if (val && !oldVal) {
			keyboardNav.disable();
		} else if (!val && oldVal) {
			keyboardNav.enable();
		}
	});
	
	$scope.$watch('showAddSupplier', function (val, oldVal) {
		if (val && !oldVal) {
			keyboardNav.disable();
		} else if (!val && oldVal) {
			keyboardNav.enable();
		}
	});
	
	$scope.$on('$destroy', function () {
		keyboardNav.disable();
	});
	
}]);


