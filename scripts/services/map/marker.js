
angular.module('employeeApp.services')
.factory('mapMarker', [function() {
    function MarkerFactory(configs){
        function Marker(configs){
            if (angular.isObject(configs)) {
                
                if (configs.map instanceof google.maps.Map) {
                    this._map = configs.map;
                } else {
                    throw new TypeError("Is not an instance of google.maps.Map");
                }
                
                if (!configs.position instanceof google.maps.LatLng) {
                    throw new TypeError("Is not an instance of google.maps.LatLng");
                }
                
                this._marker = new google.maps.Marker({ 
                    position: configs.position,
                    map: this._map,
                    draggable: true,
                    animation: google.maps.Animation.DROP
                });
                
                google.maps.event.addListener(this._marker, 'dragend', function(e){
                    (this.onchange || angular.noop)(e.latLng);
                }.bind(this));
            }
        }
        
        Object.defineProperties(Marker.prototype, {
            lat:{
                get:function(){return this._marker.getPosition().lat() || null;}
            },
            lng:{
                get:function(){return this._marker.getPosition().lng() || null;}
            }
        });
        
        Marker.prototype.setPosition = function(latLng){
            if(latLng instanceof google.maps.LatLng){
                this._marker.setPosition(latLng);
            }
        };
        
        Marker.prototype.hide = function(){
            this._marker.setMap(null);
        };
        
        Marker.prototype.show = function(){
            this._marker.setMap(this._map);
        };
        
        return new Marker(configs);
    }
    
    return MarkerFactory;
}]);
