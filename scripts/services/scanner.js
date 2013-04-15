'use strict';

angular.module('employeeApp.services')
  .factory('scanner', ['$location', '$rootScope', function($location, $rootScope) {
    var code = '';
    function test(){
        angular.element(document.body).keyup(function(e){
            var key = e.keyCode;
            if((96 <= key && key <= 105) || (48 <= key && key <= 90)){
                var letter = String.fromCharCode((96 <= key && key <= 105)? key-48 : key)
                code += letter;
            }else{
                switch(key){
                    case 13:
                        this.dispatch(code);
                        code = '';
                        break;
                    case 189:
                        code += '-';
                        break;
                    default:
                        break;
                }
            }
            
        }.bind(this));
    }
    
    test.prototype.dispatch = function(code){
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
                default:
                    break;
            }
        }
        
    }
    
    return new test();
  }]);
