//'use strict';

angular.module('employeeApp')
.directive('searchBar', ['$compile', function ($compile) {
	return {
		restrict: 'EA',
		scope: {
			query:	'=ngModel'
		},
		link: function postLink(scope, element, attrs) {
			var input;
			var model = attrs.ngModel || 'query';
			element.addClass('search-bar');
			if (attrs.searchBarDate !== undefined) {
				input = angular.element('<div data-ng-model="'+model+'" class="datepicker" ui-date></div>');
				element.addClass('date');
			} else {
				input = angular.element('<input size="40" placeholder="Search" ng-model="query" />');
			}
			
			$compile(input)(scope);
			element.append(input);
	
			/*
			* The handler will detect if ctrl/cmd+F 
			* is pressed on the keyboard
			* 
			* If press occurs, we disable the default action
			* perform state specific actions
			*/
			function searchHandler(evt) {
				if ((evt.which == "70" && (evt.metaKey || evt.ctrlKey))) {
					evt.preventDefault();

					//Determine
					if (element.hasClass('focus')) {
						//Hide object and blur
						input.blur();
						element.removeClass('focus');
					} else {
						//Show and focus
						input.focus();
						element.addClass('focus');   
					}
				}
			}
			//Bind an action 
			$(window).on('keydown', searchHandler);

			//Unbind when leaving the Page
			scope.$on('$destroy', function () {
				$(window).off('keydown', searchHandler); 
			});
		}
	};
}]);
