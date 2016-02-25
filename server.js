'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
try { require('dotenv').load() } catch(Error) {};

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'))

routes(app);

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Listening on port ' + port + '...')
})