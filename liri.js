var Twitter = require('twitter');

var spotify = require('spotify');

var request = require('request');

var fs = require('fs');

var keys = require("./keys.js");

console.log(keys.twitterKeys.consumer_key);

var client = new Twitter({
  consumer_key: 'keys.twitterKeys.consumer_key',
  consumer_secret: 'keys.twitterKeys.consumer_secret',
  access_token_key: 'keys.twitterKeys.access_token_key',
  access_token_secret: 'keys.twitterKeys.access_token_secret'
});

console.log(client.consumer_key);

var params = {screen_name: 'nodejs',
	count: 20};

var action = process.argv[2];
var value = process.argv[3];


switch (action) {
  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    doIt();
    break;
}

function tweets() {
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  }
	});
	console.log("tweets ran");
};

function spotify() {

	spotify.search({ type: 'track', query: process.argv[3]}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    else {
 		console.log("spotify ran");
    	console.log(data);
    }
	})
};

function movie() {

	request('http://www.omdbapi.com/?t=' + value + '&y=&plot=short&r=json', function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log("Title: " + JSON.parse(body).Title);
    		console.log("Released: " + JSON.parse(body).Year);
    		console.log("IMDB Rating: " + JSON.parse(body).Rating);
    		console.log("Plot: " + JSON.parse(body).plot);
    		console.log("Actors: " + JSON.parse(body).Actors);
    		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Rotten);
  		}
	})
};

function doIt() {

	fs.readFile("random.txt", "utf8", function(err, data) {

    data = data.split(",");

    query = data[1];

    switch(action) {
    	case data[0]:
    	spotify();
    	break;
    }

    console.log("doIt worked");

	})
};