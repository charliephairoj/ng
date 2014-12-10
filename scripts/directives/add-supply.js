
angular.module('employeeApp.directives')
.directive('addSupply', ['$rootScope', 'Supplier', 'Supply', 'Notification', '$http',
function ($rootScope, Supplier, Supply, Notification, $http) {
	return {
		templateUrl: 'views/templates/add-supply.html',
		replace: true,
		restrict: 'EA',
		scope: {
			'visible': '=addSupply',
			'onAdd': '&',
			'supplier': '='
		},
		require: '?supplyList',
		link: function postLink(scope, element, attrs, supplyListCtrl) {
			
			
			/*
			 * Vars and Properties
			 */
			
			scope.types = {};
			
			$http.get('/api/v1/supply/type').then(function (response) {
				for (var i = 0; i < response.data.length; i++) {
					if (response.data[i] && response.data[i] != 'custom' && !scope.types[response.data[i].toLowerCase()]){
						scope.types[response.data[i]] = response.data[i].toLowerCase();
					}
				}
			});
		
			
			/*
			 * Watch the supplier scope in case a supplier is assigned
			 */
			
			scope.showWidth = function () {
				var units = scope.supply.units;
				var type = scope.supply.type;
				return scope.supply.new_supply ? (units === "m" || units === "pc" || units === "pack" || units === "yd" ||
				(units === "kg" && type === "packaging") ? true : false) : false;
			};
			
			scope.showDepth = function () {
				var units = scope.supply.units;
				return scope.supply.new_supply ? (units === "pc" || units === "pack" ? true : false) : false;
			};
			
			scope.showHeight = function () {
				var units = scope.supply.units;
				var type = scope.supply.type;
				return scope.supply.new_supply ? (units === "pc" || units === "pack" ||
				(units === "kg" && type === "packaging") ? true : false) : false;
			};
			
			scope.supply = new Supply();
			scope.supply.units = 'pc';
			scope.suppliers = Supplier.query({limit: 0});
			scope.supplies = Supply.query({limit: 0});
			
			scope.selectSupply = function (supply) {
				angular.extend(scope.supply, supply);
			};
			
			scope.add = function () {
				if (scope.form.$valid) {
					Notification.display('Creating supply...', false);
					//Moves the supply and adds the the supplier array
					scope.supply.suppliers = scope.supply.suppliers || [];
					if (scope.supply.suppliers.indexOfById(scope.supply.supplier)) {
						scope.supply.suppliers.push(scope.supply.supplier);
					}
					delete scope.supply.supplier;
					
					//Decides whether to update or create based on presence of id
					if (scope.supply.hasOwnProperty('id')) {
						scope.supply.$update(function (response) {
							scope.visible = false;
							scope.supply = new Supply();
							Notification.display('Supply created');
						}, function (reason) {
							console.error(reason);
						});
					} else {
						scope.supply.$create(function (response) {
							Notification.display('Supply created');
							scope.visible = false;
							scope.onAdd({$supply:scope.supply});
							scope.supply = new Supply();
						}, function (reason) {
							console.error(reason);
							Notification.display('There was an error in creating the supply', false);
						});
					}
				} else {
					Notification.display('Please fill out the form properly');
				}
			};

			scope.addImage = function (data) {
				scope.supply.image = data;
			};
			
	
		}
	};
}]);
