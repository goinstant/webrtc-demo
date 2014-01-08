/*jshint node:true */
'use strict';

/**
 * @requires
 */
var crypto = require('crypto');
var jwtSimple = require('jwt-simple');
var config = require('./config');

/**
 * @const
 */
var ROOM_PREFIX = 'conference:';
var SUB_PREFIX = 'webrtc-demo:';

/**
 * @exports
 */
var generator = exports;
generator.constructor = function generator() {};

generator.randomBytes = function(n, cb) {
  crypto.randomBytes(n, function(err, buf) {
    var rnd = buf.toString('hex');

    cb(rnd);
  });
};

generator.room = function(cb) {
  this.randomBytes(8, function(bytes) {
    var room = ROOM_PREFIX + bytes;

    cb(room);
  });
};

generator.token = function(data, cb) {
  this.randomBytes(20, function(bytes) {

    var claims = {
      sub: SUB_PREFIX + bytes,
      iss: config.goinstant.app.iss,
      dn: data.dn
    };

    var token = jwtSimple.encode(claims, config.goinstant.app.secret);

    cb(token);
  });
};
