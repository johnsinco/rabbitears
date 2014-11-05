angular.module('rabbitTv', [])
  .controller('MainCtrl', [
    '$scope',
    function($scope){
      $scope.zipcode = "Parker (80134)"
      $scope.movies = [
        {"title": "Fury", 
         "shortDescription": "A tank commander takes his men on a deadly mission to strike at the heart of Nazi Germany.",
         "rating": "R",    
         "releaseDate": "2014-10-17",
         "showtimes": [{ "theatre": "AMC Twenty Mile 10", "time" : "2014-11-04T13:05"},
                       { "theatre": "AMC Twenty Mile 10", "time" : "2014-11-04T13:05"}]
         }
      ];
    }]);

