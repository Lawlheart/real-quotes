'use strict';

var passport = require('passport');

var QuotesController = require('../controllers/quotes.server.js');

module.exports = function(app) {
  
  var quotes = new QuotesController();

  function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }


  app.route('/')
    .get(function(req, res) {
      res.sendFile(process.cwd() + '/public/index.html');
    });

  app.route('/logout')
    .get(function (req, res) {
      req.logout();
      res.redirect('/login');
    });

  app.route('/api/quotes')
    .get(quotes.index)
    .post(quotes.create)

  app.route('/api/me')
    .get(function(req, res) {
      if(req.user) {
        res.json(req.user);
      } else {
        res.json("");
      }
    })

  app.route('/api/:userid/quotes')
    .get(quotes.user)

  app.route('/api/quotes/:id')
    .get(quotes.show)
    .put(quotes.update)
    .delete(quotes.destroy);


  app.route('/auth/github')
    .get(passport.authenticate('github', {
      scope: ['user:email']
  }));

  app.route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/',
      failure: '/'
  }));

  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/',
      failure: '/'
  }));

  app.route('/*')
    .get(function(req, res) {
      res.sendFile(process.cwd() + '/public/index.html');
    });

}