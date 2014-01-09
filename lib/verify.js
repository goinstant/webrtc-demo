/*jshint node:true */
'use strict';

/**
 * @requires
 */
var generator = require('./util/generator');
var config = require('./util/config');

/**
 * @const
 */
var ROOM_ERROR = 'Error: The provided room paramter is invalid.';
var TOKEN_ERROR = 'Error: Token not found.';

var ROOM_REGEX = /^(room_[a-zA-Z0-9]{6}$)/;

var verify  = exports;
verify.constructor = function verify() {};

verify.room = function(req, res, next) {
  if (req.params.room) {
    var room = req.params.room;

    if (!room.match(ROOM_REGEX)) {
      res.statusCode = 400;

      return res.send(ROOM_ERROR);
    }

    req.session.room = room;

    req.session.save(function() {
      next();
    });
  }
};

verify.token = function(req, res, next) {
  if (!req.session.token) {
    return res.redirect('/');
  }

  next();
};
