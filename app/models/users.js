'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var User = new Schema({
  username: String,
  twitter: {},
  github: {
    id: String,
    displayName: String,
    username: String,
    publicRepos: Number
  }
});

module.exports = mongoose.model('User', User)