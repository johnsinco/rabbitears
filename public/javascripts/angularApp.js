 angular.module('movieService', ['ngResource']).
  factory('Movies', ['$resource', 
    function($resource) {
      return $resource('movies/:zipcode', {}, {
        query: { method: 'GET', params: { zipcode: '80134' }, isArray: true }
    })
  }]);

angular.module('rabbitTv', ['movieService'])
  .controller('MainCtrl', ['$scope', "$http", 'Movies',
    function($scope, $http, Movies) {
      if(window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(function(pos){
          $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&sensor=true').then(
            function(resp) {
              geos = resp.data.results;
              if(geos) {
                for(var i=0; i < geos.length; i++) {
                  addr = geos[i];
                  for(var j=0; j < addr.address_components.length; j++) {
                    comp = addr.address_components[j];
                    if(comp.types[0] == 'postal_code') {
                      $scope.zip = comp.short_name;
                      console.log("set $scope.zip to " + comp.short_name);
                      console.log("calling query with $scope.zip = "+ $scope.zip);
                      $scope.movieData = Movies.query({zipcode: $scope.zip}, function(data) {$scope.movies = data});
                      $scope.zipcode = comp.short_name;
                      return;
                    }
                  }
                }
              }
            });
        });
      } 
    }]);

