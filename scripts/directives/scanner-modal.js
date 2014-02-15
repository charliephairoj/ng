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
			
			scanner.enable();
			scope.$watch('visible', function (val) {
				if (val) {
					scanner.disableStandard();
					scanner.register(/^DRS-\d+$/, function (code) {
						scope.supply = Supply.get({id:code.split('-')[1]}, function(){}, function () {
							/*
							scope.supply = Supply.get({id:code}, function () {
								Notification.display('Unable to find supply', false);
							});
							*/
						});
					});
					scanner.register(/^\d+(\-\d+)*$/, function (code) {
						scope.supply = Supply.get({upc:code});
					});
				} else {
					scanner.enableStandard();
				}
			});
			
		
		}
	};
}]);
