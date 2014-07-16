
angular.module('employeeApp.directives')
.directive('supply', ['$http', 'Supply', '$rootScope', 'Notification', '$timeout', '$window', function ($http, Supply, $rootScope, Notification, $timeout, $window) {
	
	function createChart(data, property, largestSize, className) {
		var box = d3.select('div.'+className+' .chart').selectAll('div').data(data).enter().append('div')
		.attr('class', 'price-box').style('left', function (d, i) {return ((i * 6) + i) + 'em';})
		.attr('class', function (d, i) {
			try {
				if (Number(data[i+1][property]) > Number(d[property])) {
					return 'price-box green';
				} else if (Number(data[i+1][property]) < Number(d[property])) {
					return 'price-box red';
				} else {
					return 'price-box black';
				}
			} catch (e) {
				return 'price-box black';
			}
	
		});

		var costSpans = box.append('span').text(function (d) {return d[property];}).attr('class', 'price');
		var dateSpans = box.append('span').attr('class', 'date')
		.text(function (d) {
			var date = new Date(d.timestamp);
			return date.toLocaleDateString('en-us', {year: 'numeric', 'month': 'short', day: 'numeric'});
		});

		d3.select('div.'+className).transition().duration(1000).style('border', '1px solid #CCC').style('height', '10em');
		box.transition().duration(2000).delay(1000).style('height', function (d) { return (((d[property]) / largestSize) * 8) + 'em';});
	}
	return {
  		templateUrl: 'views/templates/supply.html',
		replace: true,
  	  	restrict: 'EA',
		scope: {
			supply: '='
		},
  	  	link: function postLink(scope, element, attrs) {
			
			scope.fetched = false;
			scope.units = angular.copy($rootScope.units);
			scope.types = angular.copy($rootScope.types || []);
			
			var updateLoopActive = false,
				cancelWatch = angular.noop(),
				badTypes = ['custom', null];
			
			//Modify Types
			for (var y = 0; y < badTypes.length; y++) {
				var index = scope.types.indexOf(badTypes[y]);
				if (index != -1) {
					scope.types.splice(scope.types.indexOf(badTypes[y]), 1);
				}
			};
			
			/*
			 * General Functions
			 */
			
			//Start a watch on the scope for the supply var
			function startWatch() {
				cancelWatch = scope.$watch(function () {
					var supply = angular.copy(scope.supply);
					var attrsToRemove = ['last_modified', 'image', 'supplier', 'sticker'];
					for (var i = 0; i < attrsToRemove.length; i++) {
						delete supply[attrsToRemove[i]];
					}
					return supply;
				}, function (newVal, oldVal) {
					if (!updateLoopActive && oldVal.hasOwnProperty('id') && !angular.equals(newVal, oldVal)) {
						updateLoopActive = true;
						timeoutPromise = $timeout(function () {
							supply = angular.copy(scope.supply);
							Notification.display('Updating ' + scope.supply.description + '...', false);
							supply.$update({'country': $rootScope.country}, function () {
								updateLoopActive = false;
								Notification.display(scope.supply.description + ' updated');
							}, function () {
								Notification.display("There was an error in updating " + scope.supply.description);
							});
						}, 5000);
					}
				}, true);
			}
			
			function prepareData(response, attrName) {
				var data = response.data || response;
				var subData = [];
				for (var i = 0; i < data.length; i++) {
					subData.push(data[i][attrName]);
				}
				
				largest = Math.max.apply(Math, subData);
				
				return {'largest': Math.max.apply(Math, subData),
						'data': data};
			}
			/*
			 * Seletively show dimensions
			 */
			scope.showWidth = function () {
		
				return validWidth.indexOf($scope.supply.units) > -1 || 
				validWidth.indexOf($scope.supply.type) > -1 ||
				($scope.supply.units == 'kg' && $scope.supply.type == 'packaging') ? true : false;
			};
	
			scope.showDepth = function () {
				return validDepth.indexOf($scope.supply.units) > -1 ? true : false;
			};
	
			scope.showHeight = function () {
				return validHeight.indexOf($scope.supply.units) > -1 ||
				($scope.supply.units == 'kg' && $scope.supply.type == 'packaging') ? true : false;
			};
			
			scope.viewStickers = function () {
				try {
					$window.open(scope.supply.sticker.url);
				} catch (e) {
					Notification.display("This supply is missing a sticker");
				}
			};
			
			scope.activate = function () {
				if (element.hasClass('active')) {
					element.removeClass('active');
					cancelWatch();
				} else {
					element.addClass('active');
					
					Supply.get({id:scope.supply.id}, function (response) {
						angular.extend(scope.supply, response);
						
						startWatch();
						scope.fetched = true;
						
						$http.get('/api/v1/log', {params: {'action': 'SUBTRACT', 'supply': scope.supply.id}}).then(function(response) {
							
							var dataObj = prepareData(response, 'quantity');
							
							if (dataObj.data.length > 0) {
								createChart(dataObj.data, 'quantity', dataObj.largest, 'usage-chart-supply-'+scope.supply.id);
							}
						});
				
						for (var index in scope.supply.suppliers) {
							var supplier = scope.supply.suppliers[index];
			
							if (typeof(supplier) == "object") {
								
								$http.get('/api/v1/log', {params: {'action': 'PRICE CHANGE', 'supply': scope.supply.id, 'supplier': supplier.id}}).then(function(response) {
									var supplier_id = response.config.params.supplier,
										dataObj = prepareData(response, 'cost');
										
									scope.price_logs = scope.price_logs || [];
									scope.price_logs.push(dataObj.data);
									
									if (dataObj.data.length > 0) {
										createChart(dataObj.data, 'cost', dataObj.largest, 'price-chart-supplier-'+supplier_id);
									} else {
										d3.select('div.price-chart-supplier-'+supplier_id+' .chart').style('display', 'none');
									}
								}); //jshint ignore:line
							}
						}
					});
				}
			};
  	  	}
	};
}]);
