/* jshint node:true */

'use strict';

var request = require('request');
var config = require('./util/config');

var XIRSYS_SECRET = config.xirsys.secret;
var XIRSYS_IDENT = config.xirsys.ident;
var XIRSYS_DOMAIN = config.xirsys.domain;
var XIRSYS_ROOM = config.xirsys.room;
var XIRSYS_APP = config.xirsys.app;
var XIRSYS_ICE_URL = 'https://api.xirsys.com/getIceServers';

var xirSys = exports;
xirSys.constructor = function xirSys() {};

xirSys.getIceServers = function(cb) {
  if (!XIRSYS_SECRET || !XIRSYS_IDENT) {
    return cb(null, null);
  }

  var data = {
    domain: XIRSYS_DOMAIN,
    room: XIRSYS_ROOM,
    application: XIRSYS_APP,
    username: 'webrtc-user',
    ident: encodeURIComponent(XIRSYS_IDENT),
    secret: encodeURIComponent(XIRSYS_SECRET),
    secure: 1
  };

  request.post({ url: XIRSYS_ICE_URL, form: data }, function(err, res, body) {
    if (err) {
      return cb(err);
    }

    var iceServers = JSON.stringify(JSON.parse(body).d);

    cb(null, iceServers);
  });
};
