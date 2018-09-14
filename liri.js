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

function spotifyThis() {
    require("dotenv").config();
    var spotifyKeys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(spotifyKeys);

    var queryTerm = "Hotel California";
    for (var i = 3; i < process.argv.length; i++) {
        if (i > 3 && i < process.argv.length) {
            queryTerm = queryTerm + "+" + process.argv[i];
        } else {
            queryTerm = "";
            queryTerm += process.argv[i];
        }
    }

    spotify.search({
        type: 'track',
        query: queryTerm
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //
        console.log("\n******************************\n");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("\nSong: " + data.tracks.items[0].name);
        console.log("\nLink: " + data.tracks.items[0].preview_url);
        console.log("\nAlbum: " + data.tracks.items[0].album.name);
        console.log("\n******************************\n");

    }); // End of spotifyThis()


} // End of spotifyThis()

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

function concertThis() {
    /* 
    This API needed to send developers "written consent" in order to let us
    use their API. I just see this at the night of the submission of assignment,
    so I did not have enough time to get their written consent. For more info, 
    visit: http://www.artists.bandsintown.com/bandsintown-api 
    */
} // End of concertThis()