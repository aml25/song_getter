var fs = require("fs");
var https = require("https");
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
var PlayMusic = require('playmusic');

var config = JSON.parse(fs.readFileSync("config.json"));
//console.log(config);

var PlayMusic = require('playmusic');
var pm = new PlayMusic();
pm.init(config.playmusic, function(err) {
    if(err) console.error(err);
    
    startSearch();
})

function startSearch(){
	rl.question("What do you want to search for? ", (answer) => {
    	console.log(answer);
    	
    	searchTrack(answer);
    });
}


function searchTrack(query){
	pm.search(query, 20, function(err, data) { // max 5 results
		var song = data.entries.sort(function(a, b) { // sort by match score
			return a.score < b.score;
		});

		var tracks = [];

		for(var i=0;i<song.length;i++){
			//console.log(song[i]);
			if(song[i].type == "1"){
				console.log(song[i]);
				tracks.push(song[i].track);
			}
		}
        

		for(var i=0;i<tracks.length;i++){
			console.log(i + ": " + tracks[i].artist + " - " + tracks[i].title + " (" + tracks[i].album + ")");
		}
		console.log(tracks.length + ": redo search");

		rl.question("Which result should I get? ", (answer) => {
			console.log(answer);
			console.log(tracks[answer]);
			if(answer == tracks.length){
				startSearch();
			}
			else{
				getStreamUrl(tracks[answer]);
			}
		});
		
	}, function(message, body, err, httpResponse) {
		console.log(message);
	});
}

function getStreamUrl(track){
	console.log(track);
	console.log(track.storeId);

	pm.getStreamUrl(track.storeId, function(err, streamUrl) {
		console.log(streamUrl);

		storeTrack(track.artist, track.title, streamUrl, function(){
			console.log("track saved");
			rl.question("Want another song? ", (answer) => {
				console.log(answer);
				if(answer == "yes"){
					startSearch();
				}
				else{
					rl.close();
				}
			});
		})
	});

	
}


//make an HTTP request to stream the remote URL to a local file created above
function storeTrack(artist, title, url, _callback){
	var file = fs.createWriteStream(__dirname + "/music/" + artist + " - " + title + ".mp3"); //create an empty file for the track

	console.log("starting a file stream");
	var request = https.get(url, function(response) {
		var stream = response.pipe(file);
		stream.on("finish", function(){
			_callback();
		});
	});
}
