 angular.module('movieService', ['ngResource']).
  factory('Movies', ['$resource', 
    function($resource) {
      return $resource('movies/:zipcode', {}, {
        show: { method: 'GET', params: { zipcode: '80134' }, isArray: true }
    })
  }]);

angular.module('rabbitTv', ['movieService'])
  .controller('MainCtrl', ['$scope', 'Movies',
    function($scope, Movies) {
      $scope.zipcode = "Parker (80134)"
      $scope.movieData = Movies.query(function(data) {$scope.movies = data});
      // $scope.movies = [
        // {"title": "Fury", 
        //  "shortDescription": "A tank commander takes his men on a deadly mission to strike at the heart of Nazi Germany.",
        //  "rating": "R",    
        //  "releaseDate": "2014-10-17",
        //  "showtimes": [{ "theatre": "AMC Twenty Mile 10", "time" : "2014-11-04T13:05"},
        //                { "theatre": "AMC Twenty Mile 10", "time" : "2014-11-04T13:05"}]
      //    }
      // ];
    }]);

