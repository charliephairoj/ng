'use strict';

angular.module('employeeApp.services')
  .factory('scanner', ['$location', '$rootScope', function($location, $rootScope) {
    var code = '';
    function Scanner(){
        this._activeParse = false;
        this._onscan;
    }
    
    Scanner.prototype._check = function(evt, customFn){
        if(evt.keyCode == 76 && evt.altKey){
            this._activeParse = true;
        }
        if(this._activeParse){
            this._parse(evt);
        }
    };
    
    Scanner.prototype._parse = function(evt){
        var key = evt.keyCode;
        if(evt.altKey){
            if(key == 71){
                this._activeParse = false;
                (this._onscan || this._dispatch)(code);
                code = '';
            }
        }else if((96 <= key && key <= 105) || (48 <= key && key <= 90)){
            var letter = String.fromCharCode((96 <= key && key <= 105)? key-48 : key)
            code += letter;
        }else if(key == 189){
            code += '-';
        }
        console.log(code);
    };
    
    Scanner.prototype._dispatch = function(code){
        var codes = code.split('-');
        console.log(code);
        console.log(codes);
        if (codes.length > 1) {
            switch(codes[0]){
                case 'A':
                    $rootScope.$apply(function(){
                        $location.path('/order/acknowledgement/'+codes[1]);
                    });
                    break;
                case 'S':
                    $rootScope.$apply(function(){
                        $location.path('/order/shipping/'+codes[1]);
                    });
                    break;
                default:
                    break;
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
    
    Scanner.prototype.enable = function(){
        angular.element(document.body).bind('keydown', this._check.bind(this));
    }
    
    Scanner.prototype.disable = function(){
        angular.element(document.body).unbind('keydown', this._check.bind(this));
    }
    
    Object.defineProperty(Scanner.prototype, 'onscan', {
        set: function(fn){
            this._onscan = fn;
        }
    })
    return new Scanner();
  }]);
