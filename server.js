var proxy = require('express-http-proxy');
var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app);
var bitcoinpayurl = "http://23.249.72.123:18332/";
var litecoinpayurl = "http://23.249.72.123:19332/";
var currentBalance = 0;

var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
});


// On open to bill accepter
port.on("open", function () {

    console.log('open');

    port.on('data', function(data) {
        currentBalance = parseInt(currentBalance) + parseInt(data);
        console.log(currentBalance);
        //$("#currentBalance").html(accounting.formatMoney(currentBalance));
        //balanceUP();
    });
});


/*
// serial port reader -- may need to adjust
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var sp = new SerialPort("/dev/ttyACM0", {
    baudrate: 9600,
    parser: serialport.parsers.readline('\r\n')
});

// On open to bill accepter
sp.on("open", function () {

    console.log('open');

    sp.on('data', function(data) {
        currentBalance = parseInt(currentBalance) + parseInt(data);
        console.log(currentBalance);
        //$("#currentBalance").html(accounting.formatMoney(currentBalance));
        //balanceUP();
    });
});
*/


app.use(express.static(__dirname));
app.use('/bitcoin', proxy(bitcoinpayurl));
app.use('/litecoin', proxy(litecoinpayurl));


app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
  console.log('connection');
});
console.log('serving app on port 3000');
app.listen(3000);
