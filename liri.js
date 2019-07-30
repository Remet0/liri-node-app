require("dotenv").config();
let keys = require("../liri-node-app/key");
//var spotify = new Spotify(keys.spotify);

let axios = require('axios');
let moment = require('moment');

const command = process.argv[2];
let request = [];

for (let i = 3; i < process.argv.length; i++) {
    request.push(process.argv[i]);
}
request = request.join(' ');

switch(command){
    case 'concert-this':
    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp")
    .then(function(response){
        console.log(response)


    })

    break;
}

