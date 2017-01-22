var http = require('http');
var Bleacon = require('Bleacon')
var express = require('express')
var player = require('play-sound')(opts = {})

var app = express()
var uuid = '8492e75f4fd6469db132043fe94921d8';
var major = 0; // 0 - 65535
var minor = 0; // 0 - 65535
var beaconTypeToSound = [
    	"gate_in.wav",
    	"stairs_up.wav",
    	"stairs_down.wav",
    	"flat_bit.wav",
    	"lift.wav",
    	"escalator.wav",
    	"end_of_stairs_escalator.wav",
    	"notice.wav",
    	"destination.wav",
    	"error.mp3"
    ]

function getVolumeFromDistance (distance) {
	var volume;

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
    } else {
      var volume = .1
    }

    return volume
}

function playSound (file, volume) {
	player.play('./sounds/' + file, { afplay: ['-v', volume ] /* lower volume for afplay on OSX */ }, function(err){});
}

function log (bleacon, distance, volume) {
	console.log(bleacon['uuid']);
    console.log(bleacon['proximity'])
    console.log(bleacon['rssi']);
    console.log('>>>>>>>>>>>>');
    console.log('distance is ' + distance + ', volume is ' + volume);
}

app.get('/', function (req, res) {
  var volume;
  var distance;
  var play = true;
  Bleacon.startScanning([uuid]);
  // Bleacon.startScanning([uuid], [major], [minor]);

  Bleacon.on('discover', function(bleacon) {
    distance = bleacon['accuracy'];

    var beaconType = 1

    object = beaconTypeToSound[beaconType - 1];

    volume = getVolumeFromDistance(distance)
    if (play) {
    	playSound(object, volume);
    	play = false;
    }

    log(bleacon, distance, volume)
  	res.end('distance is ' + distance + ', volume is ' + volume)
  })
})

app.listen(8000, function () {
  console.log('Example app listening on port 3000!')
})
