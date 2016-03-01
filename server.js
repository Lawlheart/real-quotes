'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
try { require('dotenv').load() } catch(Error) {};

var app = express();

mongoose.connect(process.env.MONGO_URI || process.env.MONGOLAB_URI);

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes(app);

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Listening on port ' + port + '...')
})