require("dotenv").config();

// NPM APPS
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var moment = require('moment');

// API access
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);


/// Spotify this

var getArtistNames = function (artist) {
    return artist.names;
}

var getMeSpotify = function (songName) {

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('----------------------------------------------------');
        }
    });
}

/// Band request

var getConcert = function (artist) {
    request('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp', function (error, response, body) {
        if (err && response.statusCode != 200) {
            console.log('error:', err);
            console.log('statusCode:', response && response.statusCode);
        }

        var bP = JSON.parse(data);
        for (i = 0; i < bP.length; i++) {
            var venue = bP[i].venue.name
            var region = bP[i].venue.region
            var country = bP[i].venue.country
            var city = bP[i].venue.city

            console.log("Venue: " + venue)
            
            if (region === "") {
                console.log("Location: " + city + ", " + country)
                
            }
            else {
                console.log("Location: " + city + ", " + region)
                
            }
            console.log("Date: " + moment(bP[i].datetime).format('L'));
            
            console.log("***********************************************************")
        };
    });
};


/// Movie request 

var getMeMovie = function (movieName) {

    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var jsonData = JSON.parse(body);

            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('Rated: ' + jsonData.Rated);
            console.log('IMDB Rating: ' + jsonData.indbRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language: ' + jsonData.Language);
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);
            console.log('Rotten tomatoes ratings: ' + jsonData.tomatoesRating);
            console.log('Rotten tomatoes URL: ' + jsonData.tomatoeURL);
        }
    });
}

/// Call back that includes an error and a data argument 

var doWhatItSays = function () {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;

        var dataArr = data.split(',');

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }
    });
}

/// Data entered into terminal  

var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'concert-this':
            getConcert();
            break;
        case 'movie-this':
            getMeMovie(functionData);
        case 'do-what-it-says':
            doWhatItSays();
        default:
            console.log('LIRI does not know what that is');
    }
}

// function that passes arguments 

var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);