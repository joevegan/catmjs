var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app);

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
  console.log('connection');
});
console.log('serving app on port 3000');
app.listen(3000);
