/*jshint node:true */
'use strict';

/**
 * @requires
 */
var generator = require('../util/generator');
var config = require('../util/config');
var _ = require('lodash');

/**
 * @exports
 */
var demo = exports;
demo.constructor = function demo() {};

demo.home = function(req, res) {
  res.render('home');
};

demo.join = function(req, res) {
  var room = req.session.room;
  var token = req.session.token;

  var data = _.clone(config.data);
  data.room = room;
  data.token = token;

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

  if (!validateName(name)) {
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

function validateName(name) {
  if (name.length > 20) {
    return false;
  }

  return true;
}
