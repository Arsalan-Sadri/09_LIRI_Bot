var queryTerm = "";

doThis(process.argv[2]);

function doThis(doIt) {
    switch (doIt) {
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
            readFromFile();
            break;
        default:
            console.log("\n******************************\n");
            console.log("Not a valid operation! Please try again.");
            console.log("\n******************************\n");
            break;
    }
}

function buildQueryTerm() {
    for (var i = 3; i < process.argv.length; i++) {
        if (i > 3 && i < process.argv.length) {
            queryTerm = queryTerm + "+" + process.argv[i];
        } else {
            queryTerm += process.argv[i];
        }
    }
} // End of buildQueryTerm

function readFromFile() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log('Error occurred while dealing with file: ' + error);
        }
        var dataArr = data.split(",");
        queryTerm = dataArr[1];
        doThis(dataArr[0]);

    });
} // End of readFromFile()

function spotifyThis() {
    require("dotenv").config();
    var spotifyKeys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(spotifyKeys);

    buildQueryTerm();
    if (queryTerm === "") queryTerm = "Hotel California";

    spotify.search({
        type: 'track',
        query: queryTerm
    }, function (err, data) {
        if (err || data.tracks.items[0].artists[0].name === undefined) {
            console.log("\n******************************\n");
            console.log("No artist was found! Please try again.");
            return console.log("\n******************************\n");
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

function movieThis() {
    var request = require("request");

    buildQueryTerm();
    if (queryTerm === "") queryTerm = "Mr.+Nobody";

    var queryUrl = "http://www.omdbapi.com/?t=" + queryTerm + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200 && JSON.parse(body).Title !== undefined) {
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
        } else {
            console.log("\n******************************\n");
            console.log("No such a movie was found! Please try again.");
            console.log("\n******************************\n");
        }
    });
} // End of movieThis()

function concertThis() {
    /* 
    This API required "written consent" in order to let us
    use their API. I just see this at the night of the submission of the assignment,
    so I did not have enough time to get their written consent. I am not quite sure
    If I could have gotton their consent even within span of a week! For more info, 
    visit: http://www.artists.bandsintown.com/bandsintown-api 
    */
} // End of concertThis()