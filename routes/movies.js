var express = require('express');
var router = express.Router();
var RestClient = require('node-rest-client').Client;

var apiKey = 'fbagxybtcezrfq7bzzbf5yat';
var zip = '80134';

var outputFilter = function(movie) {
  return {
    "id" : movie.tmsId,
    "title": movie.title, "rating": (movie.ratings || [{code: 'n/a'}])[0].code, "releaseDate": movie.releaseDate, 
    "showtimes": movie.showtimes.map(function(st) { return {theatre: st.theatre.name, time: st.dateTime} } )
  }
}



/* GET movies listing. */
router.get('/:zip', function(req, res) {

  // call the gracenote api
  client = new RestClient();
  console.log("zip = " + req.params.zip);
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
});

module.exports = router;
