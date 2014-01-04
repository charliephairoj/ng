
angular.module('employeeApp.services')
.factory('scanner', ['$location', '$rootScope', function ($location, $rootScope) {
		
	var code = '',
		codes = '',
		standardCodes = [
		[/^PO-\d+$/, '/order/purchase_order/'],
		[/^A-\d+$/, '/order/acknowledgement/'],
		[/^AI-\d+$/, '/order/acknowledgement/item/'],
		[/^S-\d+$/, '/order/shipping/']
	],
		customeCodes = [],
		parseStandardCodes = true;
		
    function Scanner() {
		this._activeParse = false;
		this._onscan = null;
		this._code = '';
    }
    
	Scanner.prototype._check = function (evt, customFn) {
		if (evt.keyCode === 76 && evt.altKey) {
			evt.preventDefault();
			this._activeParse = true;
		} else if (evt.altKey && evt.keyCode == 71) {
			evt.preventDefault();
			this._activeParse = false;
			this._dispatch(code);
			code = '';
		} else {
			if (this._activeParse) {
				evt.preventDefault();
				this._parse(evt);
			}
		}
	};
    
	Scanner.prototype._parse = function (evt) {
		var key = evt.keyCode;
		if ((96 <= key && key <= 105) || (48 <= key && key <= 90)) {
			var letter = String.fromCharCode((96 <= key && key <= 105) ? key - 48 : key);
			code += letter;
		} else if (key === 189) {
			code += '-';
		}
	};

	Scanner.prototype._dispatch = function (code) {
		codes = code.split('-');
		if (parseStandardCodes) {
			for (var i=0; i<standardCodes.length; i++) {
				if (standardCodes[i][0].test(code)) {
					codes = code.split('-');
					/* jshint ignore:start */
					$rootScope.safeApply(function () {
						$location.path(standardCodes[i][1]+codes[1]);
					});
					/* jshint ignore:end */
				}
			}
		}

		for (var h=0; h<customCodes.length; h++) {
			if (customCodes[h][0].test(code)) {
				customcodes[h][1](code);
			}
		}
	};
    
    /*
     * Public API
     * 
     * -enable
     * -disable
     * -onscan
     */
    
	Scanner.prototype.enable = function () {
		angular.element(document.body).bind('keydown', this._check.bind(this));
	};
    
	Scanner.prototype.disable = function () {
		angular.element(document.body).unbind('keydown', this._check.bind(this));
	};
    
	Scanner.prototype.disableStandard = function () {
		parseStandardCodes = false;
	};
    
	Scanner.prototype.enableStandard = function () {
		parseStandardCodes = true;
	};
    
	Scanner.prototype.register = function (re, fn) {
		customCodes.push([re, fn]);
	};
    
	Scanner.deregister = function (re) {
		for (var i=0; i<customCodes.length; i++) {
			if (customCodes[i][0] == re) {
				customCode.splice(i);
			}
		}
	};
    
	Object.defineProperty(Scanner.prototype, 'onscan', {
		set: function (fn) {
			this._onscan = fn;
		}
	});
	return new Scanner();
	
}]);
