'use strict';

angular.module('employeeApp.directives')
  .directive('map', ['mapMarker', function (mapMarker) {
    //Create the variables to be used
    var latLng = {},
        map,
        marker,
        //Options for the map 
        mapOptions= {
            center: new google.maps.LatLng(13.776239,100.527884),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
    
    function getRegion(country){
        switch(country.toLocaleLowerCase()){
            case "thailand":
                return 'TH';
            case "usa":
                return "US";
            case "us":
                return 'US';
            case "italy":
                return 'IT';
            case 'spain':
                return 'ES';
            case 'germany':
                return 'DE';
            case 'china':
                return 'CN';
            case 'india':
                return 'IN';
            case 'new zealand':
                return 'NZ';
            case 'australia':
                return 'AU';
            default:
                return false;
        }
    }
    //Function to initialize the map
    function initialize() {
        
        
            
             
    }
    return {
        restrict:'A',
        replace:false,
        link: function(scope, element, attrs){
            scope.map = {
                Marker: mapMarker,
                LatLng: google.maps.LatLng
            }
            scope.map.map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
            
            //Refresh the map if a shown event is broadcast
            scope.$on('shown', function(){
              google.maps.event.trigger(map, 'resize');
            });
            
            //Create a marker and adds to scope.map.markers
            scope.map.createMarker = function(obj){
                if(obj instanceof google.maps.LatLng){
                    var latLng = obj;
                }else if(obj.hasOwnProperty('lat') && obj.hasOwnProperty('lng')){
                    var latLng = new google.maps.LatLng(obj.lat, obj.lng);
                }else{
                    var latLng = null;
                }
                
                return new scope.map.Marker({
                    map:this.map,
                    position:latLng
                });
            };
            //Set map position
            scope.map.setPosition = function(obj){
                if(obj instanceof google.maps.LatLng){
                    var latLng = obj;
                }else{
                    var latLng = new google.maps.LatLng(obj.lat, obj.lng);
                }
                
                this.map.panTo(latLng);
                this.map.setZoom(14);
                
            };
            
          
        }
    };
  }]);
