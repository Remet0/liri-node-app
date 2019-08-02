# liri-node-app

contributers: John Remeto

This app allows for users to search artists to find concert dates and locations, look up songs to find information such as album title, song name, and preview URL's, and look up movie information such as plot, rating, actors, ect. All of these are done with simple text commands so the user can aquire the information they want as quickly as possible.

The app utlizes switch cases to take in your command and request, and input them into one of 3 api's. It utilizes axios, node-spotify-api, dotenv, moment, and fs node packages. API calls to OMBD API and Bands in Town API are made with axios while spotify calls are made with the node-spotify-api package. 

To use this app clone the repository to your computer. You will need to use your own keys for the spotify API which can be found here [Spotify API](https://developer.spotify.com/documentation/web-api/). Once cloned you will also need to download all the packages found in the package.json file. When all files are download you can open your console and move to the liri.js directory. 

Input: node liri.js 

follow by one of 4 commands and your request: 

1. concert-this request
2. spotify-this-song request
3. movie-this request
4. do-what-it-says

for example: node liri.js concert-this post malone

once you hit enter the app will run, follow your command and output the requested data. 

The following are images of the working product:

If concert-this returns concert times:

![post malone concert](/images/concert_return.jpg)

If their are no upcoming concerts:

![null concert return](/images/concert_null_return.jpg)

If movie-this returns a movie:

![shrek movie info](/images/shrek.jpg)

If their is no data on the movie(unfortunately shrek 2 is not in the database):

![shrek 2 movie info](/images/shrek2.jpg)

If no request is made on the movie-this command:

![no movie request](/images/movie_empty.jpg)

If spotify-this-song returns a song:

![inTheEnd](/images/song.jpg)

If spotify-this-song doesn't have a song to return:

![no song](/images/song_null.jpg)
