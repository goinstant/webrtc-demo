/*jshint node:true */
'use strict';

/**
 * @requires
 */
var generator = require('../generator');
var xirSys = require('../xirsys');
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
    message: !tokenExists && !roomExists ? HINT_START : HINT_JOIN
  };

  res.render('home', data);
};

demo.join = function(req, res) {
  var room = req.session.room;
  var token = req.session.token;
  var host = req.session.host;

  var data = {
    cdn: config.platform.host + config.platform.path,
    url: config.goinstant.connectUrl
  };

  data.room = room;
  data.token = token;
  data.host = req.session.host;
  data.joinURL = req.protocol + '://' + req.get('host') + req.url;

  xirSys.getIceServers(function(err, iceServers) {
    if (err) {
      throw err;
    }

    data.iceServers = iceServers || null;

    res.render('conference', data);
  });
};

demo.create = function(req, res) {
  // Room already exists in session
  if (req.session.room) {
    return res.redirect('/conference/' + req.session.room);
  }

  // Generate a random room
  generator.room(function(room) {
    req.session.room = room;
    req.session.host = room;

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
