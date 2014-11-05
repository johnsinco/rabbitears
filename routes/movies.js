var express = require('express');
var router = express.Router();
var RestClient = require('node-rest-client').Client;

var apiKey = 'fbagxybtcezrfq7bzzbf5yat';
var zip = '80134';

var outputFilter = function(movie) {
  return {
    "title": movie.title, "rating": (movie.ratings || [{code: 'n/a'}])[0].code, "releaseDate": movie.releaseDate, 
    "showtimes": movie.showtimes.map(function(st) { return {theatre: st.theatre.name, time: st.dateTime} } )
  }
}


/* GET movies listing. */
router.get('/', function(req, res) {

  // call the gracenote api
  client = new RestClient();

  now = new Date();
  dateStr = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + String("00" + now.getDate()).slice(-2)

  args = {path: {"startDate" : dateStr, "zip" : zip, "apiKey": apiKey}};
  client.get("http://data.tmsapi.com/v1/movies/showings?startDate=${startDate}&zip=${zip}&radius=10&api_key=${apiKey}", 
    args, 
    function(data, response) {
      // parsed response body as js object
      // return a filtered subset of the api data
      res.json(data.map(outputFilter));
  });

  // res.json({"title": "Fury", 
  //        "shortDescription": "A tank commander takes his men on a deadly mission to strike at the heart of Nazi Germany.",
  //        "rating": "R",    
  //        "releaseDate": "2014-10-17",
  //        "showtimes": [{ "theatre": "AMC Twenty Mile 10", "time" : "2014-11-04T13:05"},
  //                      { "theatre": "AMC Twenty Mile 10", "time" : "2014-11-04T13:05"}]
  //        });
});



module.exports = router;
