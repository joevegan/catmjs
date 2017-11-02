var proxy = require('express-http-proxy');
var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app);
var bitcoinpayurl = "http://23.249.72.123:18332/";
var litecoinpayurl = "http://23.249.72.123:19332/";



app.use(express.static(__dirname));
app.use('/bitcoin', proxy(bitcoinpayurl));
app.use('/litecoin', proxy(litecoinpayurl));


app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
  console.log('connection');
});
console.log('serving app on port 3000');
app.listen(3000);
