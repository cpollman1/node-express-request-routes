var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(function(req, res, next) {
	console.log('time:', Date.now());
	next();
});

// app.get('/movie', function(req, res) {
//     request.get('http://www.omdbapi.com/?t=the+big+lebowski', function(error, response, body) {
//         res.send(body);
//     });
// });

app.get('/movie/:moviename', function(req, res) {
	var url = 'http://www.omdbapi.com/?t=' + req.params.moviename;
	request.get(url, function(error, response, body) {
		res.send(body);
	});
});

app.post('/movies', function(req, res) {
	var movie = req.body.moviename;
	console.log(movie);
	var url = 'http://www.omdbapi.com/?t=' + movie;
	request.get(url, function(error, response, body)
	{
		var parseBody = JSON.parse(response.body);
		var obj = {
			Title: parseBody.Title,
			Year: parseBody.Year,
			Rated: parseBody.Rated
		};
		console.log('ummmmm');
		res.send(obj);
	});
	
});

app.listen(3000, function () {
	console.log('Listening on port 3000!');
});