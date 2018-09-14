// // to read and set any environment variables with the dotenv package
// require("dotenv").config();

// // import keys.js
// var sptKeys = require("./keys.js");
// var spotify = new Spotify(sptKeys.spotify);




//
var doThis = process.argv[2];
switch (doThis) {
    case "movie-this":
        movieThis();
        break;
    case "spotify-this-song":
        spotifyThis()
        break;
    case "concert-this":
        concertThis()
        break;
    case "do-what-it-says":
        break;
    default:
        console.log("Not a valid operation!");
        break;
}

function movieThis(movieName) {
    var request = require("request");
    var movieName = "Mr.+Nobody";
    for (var i = 3; i < process.argv.length; i++) {
        if (i > 3 && i < process.argv.length) {
            movieName = movieName + "+" + process.argv[i];
        } else {
            movieName = "";
            movieName += process.argv[i];
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("\n******************************\n");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("\nYear: " + JSON.parse(body).Year);
            console.log("\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("\nCountry: " + JSON.parse(body).Country);
            console.log("\nLanguage: " + JSON.parse(body).Language);
            console.log("\nPlot: " + JSON.parse(body).Plot);
            console.log("\nActors: " + JSON.parse(body).Actors);
            console.log("\n******************************\n");
        }
    });
} // End of movieThis()