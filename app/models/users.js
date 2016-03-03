'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var User = new Schema({
  username: String,
  email: String,
  image: String,
  location: String,
  displayName: String,
  twitter: Object,
  github: Object
});

module.exports = mongoose.model('User', User)