'use strict';

var QuotesController = require('../controllers/quotes.server.js');

module.exports = function(app) {

  var quotes = new QuotesController();

  app.route('/')
    .get(function(req, res) {
      res.sendFile(process.cwd() + '/public/index.html');
    });

  app.route('/api/quotes')
    .get(quotes.index)
    .post(quotes.create)

  app.route('/api/:userid/quotes')
    .get(quotes.user)

  app.route('/api/quotes/:id')
    .get(quotes.show)
    .put(quotes.update)
    .delete(quotes.destroy)

  app.route('/*')
    .get(function(req, res) {
      res.sendFile(process.cwd() + '/public/index.html');
    });

}