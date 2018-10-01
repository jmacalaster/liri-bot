//Read and set any environment variables with the dotenv package

//Variable information to access the Spotify keys 

var Spotify = require('node-spotify-api');

// Include the keys.js file so that we can reference it 

var keys = require("./keys.js");

// Create variables to access key information 

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret,
  });

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

// Require the dotenv package 
require('dotenv').config();

// Grab the movieName which will always be the third node argument.
var userInput = process.argv[2];
var userSearch = process.argv.slice(3).join(" ");

//Create variables for each type of user input

var bookThis = "book-this";
var spotifySong = "spotify-this";
var movieThis = "movie-this";
// var doWhatItSays = "do-what-it-says";

//Run a "forEach" argument and run the appropriate API call 

if (userInput == bookThis) {
    var queryUrl = "https://www.googleapis.com/books/v1/volumes?q=" + userSearch + "&maxResults=1";
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("\nBook Name: " + JSON.parse(body).items[0].volumeInfo.title + "\n----------------------");
            console.log("Author Name: " + JSON.parse(body).items[0].volumeInfo.authors[0] + "\n----------------------");
            console.log("Publisher: " + JSON.parse(body).items[0].volumeInfo.publisher + "\n----------------------");
            console.log("Published Date: " + JSON.parse(body).items[0].volumeInfo.publishedDate + "\n----------------------");
            console.log("Description: " + JSON.parse(body).items[0].volumeInfo.description + "\n----------------------");
        };
    }); 
}

else if (userInput == movieThis) {
    var queryUrl = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("\nMovie Name: " + JSON.parse(body).Title + "\n----------------------");
            console.log("Release Year: " + JSON.parse(body).Year + "\n----------------------");
            console.log("Rated: " + JSON.parse(body).Rated + "\n----------------------");
            console.log("IMBD Rating: " + JSON.parse(body).imdbRating + "\n----------------------");
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n----------------------");
            console.log("Country: " + JSON.parse(body).Country + "\n----------------------");
            console.log("Language: " + JSON.parse(body).Language + "\n----------------------");
            console.log("Plot: " + JSON.parse(body).Plot + "\n----------------------");
            console.log("Actors: " + JSON.parse(body).Actors + "\n----------------------");

        }
    });  
}

else if (userInput == spotifySong) {
    spotify.search({ type: 'track', query: userSearch, limit: 1 }, function(err, data) {
        if (err) {
          console.log('Error occurred: ' + err);
          return; 
        }

        else {
            var songInfo = data.tracks.items[0];
                console.log(songInfo.artists[0].name)
                console.log(songInfo.name)
                console.log(songInfo.album.name)
                console.log(songInfo.preview_url)
        }
      });
}




