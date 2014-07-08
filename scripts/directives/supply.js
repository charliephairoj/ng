
angular.module('employeeApp.directives')
.directive('supply', ['$http', 'Supply', '$rootScope', function ($http, Supply, $rootScope) {
	
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
					return 'price-box green';
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
			
			scope.units = angular.copy($rootScope.units);
			scope.types = angular.copy($rootScope.types);
			var badTypes = ['custom', null]
			for (var y = 0; y < badTypes.length; y++) {
				var index = scope.types.indexOf(badTypes[y]);
				if (index != -1) {
					scope.types.splice(scope.types.indexOf(badTypes[y]), 1);
				}
			}
			
			scope.activate = function () {
				if (element.hasClass('active')) {
					element.removeClass('active');
				} else {
					element.addClass('active');
				}
				
				Supply.get({id:scope.supply.id}, function (response) {
					//angular.extend(scope.supply, response);
				});
				
				$http.get('/api/v1/log', {params: {'action': 'SUBTRACT', 'supply': scope.supply.id}}).then(function(response) {
					var quantities = [];
					var data = response.data;
					for (var i = 0; i < response.data.length; i++) {
						quantities.push(response.data[i].quantity);
					}
			
					largest = Math.max.apply(Math, quantities);
			
					if (quantities.length > 0) {
						createChart(data, 'quantity', largest, 'usage-chart-supply-'+scope.supply.id);
					}
				});
				
				for (var index in scope.supply.suppliers) {
					var supplier = scope.supply.suppliers[index];
			
					if (typeof(supplier) == "object") {
						$http.get('/api/v1/log', {params: {'action': 'PRICE CHANGE', 'supply': scope.supply.id, 'supplier': supplier.id}}).then(function(response) {
							var supplier_id = response.config.params.supplier;
							var prices = [];
							var data = response.data;
							for (var i = 0; i < response.data.length; i++) {
								prices.push(response.data[i].cost);
							}
			
							largest = Math.max.apply(Math, prices);
							
							if (prices.length > 0) {
								createChart(data, 'cost', largest, 'price-chart-supplier-'+supplier_id);
							} else {
								d3.select('div.price-chart-supplier-'+supplier_id+' .chart').style('display', 'none');
							}
						}); //jshint ignore:line
					}
				}
			};
  	  	}
	};
}]);
