/*jshint node:true */
'use strict';

/**
 * @requires
 */
var generator = require('../generator');
var config = require('../util/config');
var _ = require('lodash');

var NAME_LENGTH = 25;

var HINT_START = 'Enter your name to start a new conference.';
var HINT_JOIN = 'Enter your name to join the conference.';

/**
 * @exports
 */
var demo = exports;
demo.constructor = function demo() {};

demo.home = function(req, res) {
  var tokenExists = req.session.token;
  var roomExists = req.session.room;

  var data = {
    message: (!tokenExists && !roomExists) ? HINT_START : HINT_JOIN,
    widgets: {
      webRTC: {
        js: config.data.widgets.webRTC.js
      }
    }
  };

  res.render('home', data);
};

demo.join = function(req, res) {
  var room = req.session.room;
  var token = req.session.token;

  var data = _.clone(config.data);
  data.room = room;
  data.token = token;
  data.joinURL = req.protocol + '://' + req.get('host') + req.url;

  res.render('conference', data);
};

demo.create = function(req, res) {
  // Room already exists in session
  if (req.session.room) {
    return res.redirect('/conference/' + req.session.room);
  }

  // Generate a random room
  generator.room(function(room) {
    req.session.room = room;

    req.session.save(function() {
      res.redirect('/conference/' + req.session.room);
    });
  });
};

demo.auth = function(req, res) {
  var name = req.body.displayName;

  if (name.length > NAME_LENGTH) {
    return res.redirect('/');
  }

  var data = {
    dn: name
  };

  generator.token(data, function(token) {
    req.session.token = token;

    req.session.save(function() {
      res.redirect('/conference');
    });
  });
};
