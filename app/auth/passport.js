'use strict';

var User = require('../models/users'),
    config = require('./config');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  require('./strategies/github.strategy')(User, config);
  require('./strategies/twitter.strategy')(User, config);

};
