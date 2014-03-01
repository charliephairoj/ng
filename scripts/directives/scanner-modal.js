
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
						window.globalScanner.disable();
					} catch (e) {
						
					}
					
					//Enable the scanner and disable the standard codes
					scope.scanner.enable();
					scope.scanner.disableStandard();
					
					/*
					 * Register the supply code regex
					 */
					scope.scanner.register(/^DRS-\d+$/, function (code) {
						scope.supply = Supply.get({id:code.split('-')[1]}, function(response){
							console.log(response)
						}, function () {
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
						Supply.query({upc:code}, function (response) {
							try {
								scope.supply = response[0];
							} catch (e) {
								console.log(e);
							}
						}, function (reason) {
							console.log(reason);
						});
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
