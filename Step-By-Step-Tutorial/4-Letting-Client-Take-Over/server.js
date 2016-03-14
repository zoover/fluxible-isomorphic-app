require('babel-core/register');

var express = require('express'); // import express
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Main = React.createFactory(require('./app/main.jsx'));

var server = express(); // create new instance of express

server.use(function(req, res) {
  var html = ReactDOMServer.renderToString(Main({}));
  res.send('<!DOCTYPE html>\n' + html);
});

var port = 3000;

server.listen(port, function() {
  console.log('Listening at port ' + port);
});
