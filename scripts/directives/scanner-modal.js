
angular.module('employeeApp.directives')
.directive('supplyScannerModal', ['scanner', 'Supply', 'Notification', 'KeyboardNavigation', '$timeout', '$rootScope',
function (scanner, Supply, Notification, KeyboardNavigation, $timeout, $rootScope) {
	return {
		templateUrl: 'views/templates/supply-scanner-modal.html',
		restrict: 'A',
		replace: true,
		scope: {
			'visible': '=supplyScannerModal'
		},
		link: function postLink(scope, element, attrs) {
			console.log(scope.country);
			/*
			 * Vars
			 */
			var keyboardNav = new KeyboardNavigation();
			scope.action = 'subtract';
			scope.scanner = new scanner('supply-scanner-modal');
			scope.supply = {
				'units': 'pc',
				'quantity': 0,
			};
			var focusOnQuantity = function () {
				var quantity = element.find('input');
				quantity.focus();
				quantity.val('');
			};
			
			scope.fractSize = function () {
				return scope.supply.units == 'pc' ? 0 : 2;
			};
			
			/*
			 * Watchers
			 */
			/*
			 * This is a hack to rememdy that I cannot
			 * add an ng-class to the main tag of this
			 * directive
			 */
			scope.$watch('showAddImage', function (val) {
				if (val) {
					element.addClass('add-image');
				} else {
					element.removeClass('add-image');
				}
			});
			
			/*
			 * Add Image
			 * 
			 * Updates the image of the currently selected supply
			 */
			scope.addImage = function (data) {
				Notification.display("Updating the supply's image", false);
				var image = data.hasOwnProperty('data') ? data.data : data;
				scope.supply.image = image;
				scope.supply.$update(function () {
					Notification.display("Supply's image updated.");
				});
			};
			scope.changeQuantity = function (quantity) {
				quantity = quantity || scope.quantity;
				if (scope.supply.hasOwnProperty('id') && quantity > 0) {
					scope.supply['$'+scope.action]({quantity:quantity, 'country':$rootScope.country}, function () {
						Notification.display('Quantity of '+scope.supply.description+' changed to '+scope.supply.quantity);
						scope.quantity = 0;
						$timeout(function () {
							scope.supply = undefined;
						}, 5000);
					});
				}
			};
			
			/*
			 * Register the supply code regex
			 */
			scope.scanner.register(/^DRS-\d+$/, function (code) {
				Notification.display("Looking up supply...", false);
				scope.supply = Supply.get({id:code.split('-')[1], 'country': $rootScope.country}, function(response){
					Notification.hide();
					focusOnQuantity();
				}, function () {
					Notification.display('Unable to find supply.', false);
					/*
					scope.supply = Supply.get({id:code}, function () {
						Notification.display('Unable to find supply', false);
					});
					*/
				});
			});
			/*
			 * Register the upc regex
			 */
			scope.scanner.register(/^\d+(\-\d+)*$/, function (code) {
				Supply.query({upc:code, 'country': $rootScope.country}, function (response) {
					focusOnQuantity();
					try {
						scope.supply = response[0];
					} catch (e) {
						console.log(e);
					}
				}, function (reason) {
					console.log(reason);
				});
			});
			
			/*
			 * Sets navigation
			 */
			function changeAction(action) {
				if (scope.$$phase === '$digest' || scope.$$phase === '$apply') {
					scope.action = action;
				} else {
					scope.$apply(function () {
						scope.action = action;
					});
				}
				
			}
			
			keyboardNav.onright = function () {
				changeAction('subtract');
			};
			
			keyboardNav.onleft = function () {
				changeAction('add');
			};
			
			keyboardNav.onenter = function () {
				scope.changeQuantity(scope.quantity);
			};
			
			scope.$watch('visible', function (val) {
				if (val) {
					//Disable the global scanner
					try {
						window.globalScanner.disable();
					} catch (e) {
						
					}
					
					//Enable the scanner and disable the standard codes
					scope.scanner.enable();
					keyboardNav.enable();
					scope.scanner.disableStandard();
					
					
				} else {
					scope.scanner.disable();
					keyboardNav.disable();
					scope.scanner.enableStandard();
					scope.showAddImage = false;
				}
			});
			
			scope.$on('$destroy', function () {
				keyboardNav.disable();
				scope.scanner.disable();
				scope.showAddImage = false;
			});
			
		
		}
	};
}]);
