'use strict';

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;


module.exports = function(User, config) {

  passport.use(new TwitterStrategy({
    consumerKey: config.twitterAuth.clientID,
    consumerSecret: config.twitterAuth.clientSecret,
    callbackURL: config.twitterAuth.callbackURL,
    passReqToCallback: true 
  }, 
  function(req, token, tokenSecret, profile, done) {
    if(req.user) {
      User.findOne({ _id: req.user._id }, function(err, user) {
        if(user) {
          console.log('found user data, adding twitter');
          user.twitter = {
            id: profile.id,
            token: token,
            tokenSecret: tokenSecret
          };
          user.save();
          done(null, user);
        }
      });
    } else {
      User.findOne({ 'twitter.id': profile.id }, function(err, user) {
        if(user) {
          console.log('found');
          done(null, user);
        } else {
          console.log('not found');
          user = new User({
            username: profile.username,
            displayName: profile.displayName,
            image: profile._json.profile_image_url,
            location: profile._json.location,
            twitter: {
              id: profile.id,
              token: token,
              tokenSecret: tokenSecret
            }
          }).save(function(err, user) {
            console.log('new user saved');
            done(null, user);
          });
        }
      });
    }
  }));
};