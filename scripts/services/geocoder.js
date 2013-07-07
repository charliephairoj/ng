'use strict';


angular.module('employeeApp.services')
    .factory('Geocoder', ['$q', '$rootScope', function($q, $rootScope) {
            
        /*Helper functions*/
        function prepareAddress(obj){
            var addrStr = '';
            
            if(obj.hasOwnProperty('address') || obj.hasOwnProperty('address1')){
                addrStr += obj['address'] || obj['address1'];
            }else{
                throw new TypeError("Missing 'address' or 'address1' argument");
            }
            
            if(obj.hasOwnProperty('city')){
                addrStr += ', '+obj['city'];
            }else{
                throw new TypeError("Missing 'city' argument");
            }
            
            if(obj.hasOwnProperty('territory')){
                addrStr += ', '+obj['territory'];
            }else{
                throw new TypeError("Missing 'territory' argument");
            }
            
            if(obj.hasOwnProperty('country')){
                addrStr += ', '+obj['country'];
            }else{
                throw new TypeError("Missing 'country' argument");
            }
            
            if(obj.hasOwnProperty('zipcode')){
                addrStr += ', '+obj['zipcode'];
            }else{
                throw new TypeError("Missing 'zipcode' argument");
            }
            
            return addrStr;
        }
        
        var Geocoder = {};
        
        Geocoder.init = function(){
            var google = google || undefined;
            if(google){
                this.geocoder = new google.maps.Geocoder();
            }else{
                this.geocoder = {};
            }
            
        }
        
        /*
        Object.defineProperties(Geocoder.prototype, {
            address:{
                get:function(){return this._address;},
                set:function(addr){this._address = addr;}
            },
            city:{
                get:function(){return this._city;},
                set:function(city){this._city = city;},
            },
            territory:{
                get:function(){return this._territory;},
                set:function(territory){this._territory = territory;}
            },
            country:{
                get:function(){return this._country;},
                set:function(country){
                    this._country = country;
                    this._region = this._getRegion(this._country);
                }
            }
        });*/
        
        Geocoder._getRegion = function(country){
            switch(country.toLocaleLowerCase()){
                case "thailand":
                    return 'TH';
                    break;
                case "usa":
                    return "US";
                    break;
                case "us":
                    return 'US';
                    break;
                case "italy":
                    return 'IT';
                    break;
                case 'spain':
                    return 'ES';
                    break;
                case 'germany':
                    return 'DE';
                    break;
                case 'china':
                    return 'CN';
                    break;
                case 'india':
                    return 'IN';
                    break;
                case 'new zealand':
                    return 'NZ';
                    break;
                case 'australia':
                    return 'AU';
                    break;
                default:
                    return false;
                    break;
            }
        };
        
  
        Geocoder._lookup = function(addr, callback, errback){
            var addrStr = prepareAddress(addr);
            this.geocoder.geocode( { 'address': addrStr, 'region': this._getRegion(addr.country)}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    (callback || angular.noop)(results);
                } else {
                    console.error(status);
                    (errback || angular.noop)(status);
                }
            });
        };
        
        Geocoder.geocode = function(arg){
            if(angular.isObject(arg)) {
                var deferred = $q.defer();
                
                this._lookup(arg, function(results){
                    $rootScope.safeApply(function(){
                        deferred.resolve(results);
                    });
                }, function(status){
                    $rootScope.safeApply(function(){
                        deferred.reject(status);
                    });
                });
                return deferred.promise
            }else{
                throw new TypeError("Arguments must be in the form of an object.");
            }
        };
        
        Geocoder.init();
        return Geocoder;
        
    }]);
