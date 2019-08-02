require("dotenv").config();
let keys = require("../liri-node-app/key");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

let axios = require("axios");
let moment = require("moment");
let fs = require('fs');

const command = process.argv[2];
let request = [];

for (let i = 3; i < process.argv.length; i++) {
  request.push(process.argv[i]);
}
request = request.join("");
function liri(command, request){
switch (command) {
  case "concert-this":
    axios
      .get(
        "https://rest.bandsintown.com/artists/" +
        request +
        "/events?app_id=codingbootcamp"
      )
      .then(function (response) {
        let data = response.data;
        if (data === undefined || data.length === 0) {
          console.log("No upcoming events for this artist");
          return;
        }
        for (let i = 0; i < data.length; i++) {
          let momentDate = moment(data[i].datetime, "YYYY-MM-DD[T]HH:mm:ss");
          console.log(JSON.stringify(data[i].venue.name));
          console.log(JSON.stringify(data[i].venue.city));
          console.log(moment(momentDate).format("MM/DD/YY"));
          console.log(" ");
        }
      });
    break;

  case "spotify-this-song":
    spotify.search({ type: "track", query: request, limit: 1 }, function (err,data) {
      //checks if request exists, if not then call spotify function with preset song
      if (data === null) {
        spotify.search({ type: "track", query: "The Sign", limit: 1 }, function (err, data) {
          console.log("Song not found, Try this song instead!");
          spotifyCall(err, data);
        });
        return;
      }
      //take response data and log the correct parameters.
      spotifyCall(err, data);
    });

    break;

  case "movie-this":
    if(request === ''){
      movieCall('mr.nobody');
    return;
  };
     movieCall(request);

    break;
    case 'do-what-it-says':
    fs.readFile('random.txt', 'utf8', function(err, response){
      if(err){
        return console.log(err);
      }
      let index = response.indexOf(',');
      let command = response.substr(0 , index);
      let request = response.substr(index + 1);
      liri(command, request);
      } )

    break;
}
}
liri(command, request);


//function for what to do with spotify API return;
function spotifyCall(err, data) {
  if (err) {
    return console.log("Error occurred: " + err);
  }
  let test = data.tracks.items[0];
  console.log(`Artist: ${test.artists[0].name}`);
  console.log(`Song: ${test.name}`);
  if (test.preview_url != null) {
    console.log(`Preview URL ${test.preview_url}`);
  }
  console.log(`Album Name: ${test.album.name}`);
  return;
}
//function to call a movie
function movieCall(movie){
  axios.get(`http://omdbapi.com/?t=${movie}&plot=short&apikey=trilogy`)
  .then(function(response){
    if(response.data.Response === "False"){
      console.log('We dont have information on this movie');
      return;
    }
    let data = response.data;
    console.log(data.Title);
    console.log(data.Year);
    console.log(data.imdbRating);
    for (let i = 0; i < data.Ratings.length; i++) {
      if(data.Ratings[i].Source === 'Rotten Tomatoes'){
        console.log(`${data.Ratings[i].Source} Rating: ${data.Ratings[i].Value}`);
      };
    };
    console.log(data.Country);
    console.log(data.Language);
    console.log(data.Plot);
    console.log(data.Actors);
  }) 
}