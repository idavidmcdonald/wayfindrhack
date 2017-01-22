// Load the http module to create an http server.
var http = require('http');
var Bleacon = require('Bleacon')
var uuid = '8492e75f4fd6469db132043fe94921d8';
var major = 0; // 0 - 65535
var minor = 0; // 0 - 65535


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var distance;
  var playSound = true;
  Bleacon.startScanning([uuid]);
  // Bleacon.startScanning([uuid], [major], [minor]);

  Bleacon.on('discover', function(bleacon) {
    console.log(bleacon['uuid']);
    // console.log(bleacon['accuracy']);
    distance = bleacon['accuracy'];



    var beaconType = 1

    // if (distance < .5) {
    //   var beaconType = beaconType + 1;
    // }


    if (beaconType == 1 ) {
      var object = "gate_in.wav"
    } else if (beaconType == 2){
      var object = "stairs_up.wav"
    } else if (beaconType == 3){
      var object = "stairs_down.wav"
    } else if (beaconType == 4){
      var object = "flat_bit.wav"
    } else if (beaconType == 5){
      var object = "lift.wav"
    } else if (beaconType == 6){
      var object = "escalator.wav"
    } else if (beaconType == 7){
      var object = "end_of_stairs_escalator.wav"
    } else if (beaconType == 8){
      var object = "notice.wav"
    } else if (beaconType == 9){
      var object = "destination.wav"
    } else if (beaconType == 10){
      var object = "error.mp3"
    }

    var volume = 0

    if (distance <= .1){
      var volume = 1
    } else if (distance <= .2){
      var volume = .9
    } else if (distance <= .3){
      var volume = .8
    } else if (distance <= .4){
      var volume = .7
    } else if (distance <= .5){
      var volume = .6
    } else if (distance <= .6){
      var volume = .5
    } else if (distance <= .7){
      var volume = .4
    } else if (distance <= .8){
      var volume = .3
    } else if (distance <= .9){
      var volume = .2
    } else if (distance <= 1){
      var volume = .1
    }

    response.end('distance is ' + distance + ', volume is ' + volume);

    var player = require('play-sound')(opts = {})

    if (playSound) {
    	player.play('./sounds/'+object, { afplay: ['-v', volume ] /* lower volume for afplay on OSX */ }, function(err){
    	});
    	playSound = false;
    }
    
    console.log(bleacon['proximity'])
    console.log(bleacon['rssi']);
    console.log('>>>>>>>>>>>>');
    console.log('distance is ' + distance + ', volume is ' + volume);
    response.writeHead(200, {"Content-Type": "text/plain"});

  });

  // if (distance) {
  //  response.writeHead(200, {"Content-Type": "text/plain"});
  //  response.end(distance);
  // }

});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
