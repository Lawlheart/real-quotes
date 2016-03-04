'use strict';

var Quote = require('../models/quotes.js');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function QuotesController() {
  this.index = function(req, res) {
    Quote.find().exec(function(err, data) {
      res.json(data);
    }).catch(handleError(res));
  };

  this.create = function(req, res) {
    var quote = new Quote({
      img: req.body.img,
      quote: req.body.quote,
      source: req.body.source,
      user: req.body.user,
      userId: req.body.userId,
      userImg: req.body.userImg,
      starred: []
    }).save().then(function(quote) {
      res.json(quote)
    }).catch(handleError(res));
  };

  this.show = function(req, res) {
    Quote.findById({ _id: req.params.id }).then(function(data) {
      res.json(data);
    }).catch(handleError(res));
  }

  this.update = function(req, res) {
    if(req.body._id) {
      delete req.body._id;
    }
    Quote.findByIdAndUpdate(req.params.id, req.body).then(function(data) {
      res.json(data);
    }).catch(handleError(res));
  }

  this.destroy = function(req, res) {
    Quote.findByIdAndRemove({ _id: req.params.id }).then(function(data) {
      res.json(data).end();
    }).catch(handleError(res));
  }
  this.user = function(req, res) {
    Quote.find({userId: req.params.userid}).then(function(data) {
      res.json(data);
    }).catch(handleError(res));
  }
}

module.exports = QuotesController;