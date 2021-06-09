console.log('the bot is starting');

var Twit = require('twit');

require('dotenv').config();

var T = new Twit({
     consumer_key:         process.env.CONSUMER_KEY
   , consumer_secret:      process.env.CONSUMER_SECRET
   , access_token:         process.env.ACCESS_TOKEN
   , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

var fs = require('fs');

//setInterval(tweetLyrics, 1000*10); //every 10 seconds
setInterval(tweetLyrics, 1000*60*60*24); //every 24 hours
//1000 = every second, 60 = every minute, 60 = every hour, 24 = every 24 hours ...

function tweetLyrics() {
	//reads from random file
	var randomFile = 'tweetFiles/' + (Math.floor(Math.random() * 500) + 1) + '.txt'; //500 = number of files

	var contents = fs.readFileSync(randomFile, 'utf8');

	//tweets the read content
	var tweet = {
		status: contents
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
		if (err) {
			console.log("something went wrong, " + err);
		} else {
		console.log("it worked!");
		}
	}
}

