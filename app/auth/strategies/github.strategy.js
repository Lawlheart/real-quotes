'use strict';

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;


module.exports = function(User, config) {

  passport.use(new GitHubStrategy({
    clientID: config.githubAuth.clientID,
    clientSecret: config.githubAuth.clientSecret,
    callbackURL: config.githubAuth.callbackURL,
    passReqToCallback: true
  }, 
  function(req, accessToken, refreshToken, profile, done) {
    if(req.user) {
      User.findOne({ _id: req.user._id }, function(err, user) {
        if(user) {
          console.log('found user data, adding github');
          user.github = {
            id: profile.id,
            accessToken: accessToken
          };
          if(!user.email && profile.emails) {
            user.email = profile.emails[0].value;
          }
          user.save();
          done(null, user);
        }
      });
    } else {
      User.findOne({ 'github.id': profile.id}, function(err, user) {
        if(user) {
          console.log('found');
          done(null, user);
        } else {
          console.log('not found');
          user = new User({
            username: profile.username,
            displayName: profile.displayName,
            image: profile.photos[0].value,
            location: profile._json.location,
            email: profile._json.email,
            github: {
              id: profile.id,
              accessToken: accessToken
            }
          }).save(function(err, user) {
            console.log('saved new user');
            done(null, user);
          });
        }
      });
    }
  }));
};