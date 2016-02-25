'use strict';

var GitHubStrategy = require('passport-github').Strategy,
    User = require('../models/users'),
    configAuth = require('./config');

