/*jshint node:true */
'use strict';

/**
 * @requires
 */
var crypto = require('crypto');
var Signer = require('goinstant-auth').Signer;
var config = require('./util/config');

/**
 * @const
 */
var ROOM_PREFIX = 'room_';
var SUB_PREFIX = 'webrtcdemo:';

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
  this.randomBytes(3, function(bytes) {
    var room = ROOM_PREFIX + bytes;

    cb(room);
  });
};

generator.token = function(data, cb) {
  this.randomBytes(10, function(bytes) {
    var signer = new Signer(config.goinstant.app.secret);

    signer.sign({
      domain: config.goinstant.app.iss,
      id: SUB_PREFIX + bytes,
      displayName: data.dn

    }, function(err, token) {
      if (err) {
        console.log(err);
      }

      cb(token);
    });
  });
};
