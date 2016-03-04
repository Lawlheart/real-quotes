'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Quote = new Schema({
  img: String,
  quote: String,
  source: String,
  user: String,
  userId: String,
  userImg: String,
  starred: Array
}, {strict: false});

module.exports = mongoose.model('Quote', Quote);