
angular.module('employeeApp.directives')
.directive('addSupply', ['$rootScope', 'Supplier', 'Supply', 'Notification', function ($rootScope, Supplier, Supply, Notification) {
	return {
		templateUrl: 'views/templates/add-supply.html',
		replace: true,
		restrict: 'EA',
		scope: {'visible': '=addSupply'},
		link: function postLink(scope, element, attrs) {
			
			
			scope.showWidth = function () {
				var units = scope.supply.units;
				var type = scope.supply.type;
				return units === "m" || units === "pc" || units === "pack" || units === "yd" ||
				(units === "kg" && type === "packaging") ? true : false;
			};
			
			scope.showDepth = function () {
				var units = scope.supply.units;
				return units === "pc" || units === "pack" ? true : false;
			};
			
			scope.showHeight = function () {
				var units = scope.supply.units;
				var type = scope.supply.type;
				return units === "pc" || units === "pack" || (units === "kg" && type === "packaging") ? true : false;
			};
			
			scope.supply = new Supply();
			scope.supply.units = 'pc';
			scope.suppliers = Supplier.query({limit:0});
			
			
			scope.add = function () {
				if (scope.form.$valid) {
					Notification.display('Add supply...', false);
					scope.supply.$create(function (response) {
						Notification.display(scope.supply.description+" added");
						scope.visible = false;
						scope.supply = new Supply();
					}, function(reason){
						console.error(reason);
					});
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
