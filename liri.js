var Twitter = require('twitter');

var client = require("./keys.js");

for (var key in client.twitterKeys) {
	
}

var params = {RCBAndrew: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});