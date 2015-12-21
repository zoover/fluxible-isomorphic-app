var express = require('express'); // import express

var server = express(); // create new instance of express

server.use(function(req, res) {
  res.send('hello world');
});

var port = 3000;

server.listen(port, function() {
  console.log('Listening at port ' + port);
});
