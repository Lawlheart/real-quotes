'use strict';

require('newrelic');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var favicon = require('serve-favicon');
var session = require('express-session');


var routes = require('./app/routes/index');

var app = express();
try { require('dotenv').load() } catch(Error) {};
require('./app/auth/passport')(passport);

mongoose.connect(process.env.MONGO_URI || process.env.MONGOLAB_URI);

app.use(favicon(process.cwd() + '/public/favicon.ico'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'BEFCD34CE8DC7A395A8A62459FC86',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

routes(app);

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Listening on port ' + port + '...')
})