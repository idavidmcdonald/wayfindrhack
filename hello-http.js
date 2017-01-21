// Load the http module to create an http server.
var http = require('http');
var Bleacon = require('Bleacon')

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var distance;
  Bleacon.startScanning();
  Bleacon.on('discover', function(bleacon) {
  	console.log(bleacon['uuid']);
  	// console.log(bleacon['accuracy']);
  	distance = bleacon['accuracy'];
  	console.log(bleacon['proximity'])
  	console.log(bleacon['rssi']);
  	console.log('>>>>>>>>>>>>');
  	console.log('distance is ' + distance);

  	response.writeHead(200, {"Content-Type": "text/plain"});
  	response.end('distance is ' + distance);
  });
  
  // if (distance) {
  // 	response.writeHead(200, {"Content-Type": "text/plain"});
  // 	response.end(distance);
  // }
  
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
