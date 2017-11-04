var proxy = require('express-http-proxy');
var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app);
var bitcoinpayurl = "http://23.249.72.123:18332/";
var litecoinpayurl = "http://23.249.72.123:19332/";
var currentBalance = 5;

var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyAMA0', {
  baudRate: 9600
});


// On open to bill accepter
port.on("open", function () {
    console.log('open');
});

port.on('data', function(data) {
    currentBalance = parseInt(currentBalance) + parseInt(data);
    console.log(data);
});
port.on('error', function(err) {
    console.log('Error: ', err.message);
});

app.use(express.static(__dirname));
app.use('/bitcoin', proxy(bitcoinpayurl));
app.use('/litecoin', proxy(litecoinpayurl));
app.get('/balance', function(req, res){
    res.json(currentBalance,null,200)
});
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
  console.log('connection');
});

console.log('serving app on port 3000');
app.listen(3000);
