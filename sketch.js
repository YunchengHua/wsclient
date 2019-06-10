// where the serial server is (your local machine):
var host = '112.48.80.51:8025/john';
var socket; // the websocket
var sensorValue = 0; // the sensor value
var control_points = [];

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(800, 500);
  // connect to server:
  socket = new WebSocket('ws://' + host);
  // socket connection listener:
  socket.onopen = sendIntro;
  // socket message listener:
  socket.onmessage = readMessage;

  init_clock();
}

function draw() {
  background(51);
  draw_clock();
}

function sendIntro() {
  // convert the message object to a string and send it:
  socket.send("Hello");
}

function readMessage(event) {
  var msg = event.data; // read data from the onmessage event
  var t = split(msg,";")
  control_points.splice(0,control_points.length);
  for(var i = 0;i < t.length-1;i++){
    var tt = split(t[i],",");
    var x = Number(tt[1])*width;
    var y = Number(tt[2])*height;
    control_points[i] = createVector(x,y);
  }
  //print(control_points)
}
