var proxy = require('express-http-proxy');
var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app);
var bitcoinpayurl = "http://23.249.72.123:18332/";
var litecoinpayurl = "http://23.249.72.123:19332/";
var currentBalance = 5;

var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyS0', function(err) {
    if (err) {
        return console.log('Error: ' + err.message);
    }
    baudRate: 9600

    console.log('seriel port open');


});


/* // Doc for cash acceptor
SYNC     LNG    CMD     DATA    CRC
FC       4      11              0               -- enable polling, open the cash despenser
*/



// put cash accepter in accept mode
port.write('FC041100','hex', function(err) {
    if (err) {
        return console.log('Error on write: ', err.message);
    }
    console.log('Requested cash accepter to switch to accept mode');

});


/* // flowiing mode
port.on('data', function (data) {
  console.log('Data:', data);
});
*/

port.on('readable', function () {
  console.log('Data:', port.read());
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
