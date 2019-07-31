require("dotenv").config();
let keys = require("../liri-node-app/key");
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);

let axios = require('axios');
let moment = require('moment');

const command = process.argv[2];
let request = [];

for (let i = 3; i < process.argv.length; i++) {
    request.push(process.argv[i]);
}
request = request.join('');

switch(command){
    case 'concert-this':
    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp")
    .then(function(response){
        let data = response.data
        if(data === undefined || data.length === 0){
            console.log('No upcoming events for this artist')
            return;
        }
        for (let i = 0; i < data.length; i++) {
            let momentDate = moment(data[i].datetime, "YYYY-MM-DD[T]HH:mm:ss");
            console.log(JSON.stringify(data[i].venue.name));
            console.log(JSON.stringify(data[i].venue.city));
            console.log(moment(momentDate).format('MM/DD/YY'));
            console.log(' ');
        };
        
    })
    break;

    case 'spotify-this-song':

            spotify.search({ type: 'track', query: request, limit: 1 }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
               let test = data.tracks.items[0];
              console.log(`Artist: ${test.artists[0].name}`);
              console.log(`Song: ${test.name}`);
              if(test.preview_url != null){
              console.log(`Preview URL ${test.preview_url}`);
              }
              console.log(`Album Name: ${test.album.name}`);
            });

    break;
}

