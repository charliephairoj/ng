'use strict';

angular.module('employeeApp.directives')
.directive('supplyScannerModal', ['scanner', 'Supply', 'Notification', function (scanner, Supply, Notification) {
	return {
		templateUrl: 'views/templates/supply-scanner-modal.html',
		restrict: 'A',
		scope: {
			'visible': '=supplyScannerModal'
		},
		link: function postLink(scope, element, attrs) {
			
			scope.scanner = new scanner('supply-scanner-modal');
			scope.$watch('visible', function (val) {
				if (val) {
					//Disable the global scanner
					try {
						globalScanner.disable();
					} catch (e) {
						
					}
					
					//Enable the scanner and disable the standard codes
					scope.scanner.enable();
					scope.scanner.disableStandard();
					
					/*
					 * Register the supply code regex
					 */
					scope.scanner.register(/^DRS-\d+$/, function (code) {
						scope.supply = Supply.get({id:code.split('-')[1]}, function(){}, function () {
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
						scope.supply = Supply.get({upc:code});
					});
				} else {
					scope.scanner.disable();
					scope.scanner.enableStandard();
				}
			});
			
			scope.$on('$destroy', function () {
				scope.scanner.disable();
			});
			
		
		}
	};
}]);
