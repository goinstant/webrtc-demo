/*jshint node:true */
'use strict';

/**
 * @requires
 */
var generator = require('../util/generator');
var config = require('../util/config');

/**
 * @const
 */
var ROOM_ERROR = 'Error: The provided room paramter is invalid.';
var TOKEN_ERROR = 'Error: Token not found.';

var verify  = exports;
verify.constructor = function verify() {};

verify.room = function(req, res, next) {
  if (req.params.room) {
    var room = req.params.room;

    if (!validateRoom(room)) {
      var err = new Error(ROOM_ERROR);

      return next(err);
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

function validateRoom(room) {

  if (room.length > 100) {
    return false;
  }

  return true;
}
