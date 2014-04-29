/*jshint node:true */

'use strict';

/**
 * @requires
 */
var _ = require('lodash');
var url = require('url');

/**
 * @const
 */
var ENV = process.env;
var NODE_ENV = ENV.NODE_ENV || 'local';

var LOCAL_ISS = 'localhost/auth';

var redisUrl = NODE_ENV !== 'local' ?
  ENV.REDISCLOUD_URL : ENV.REDIS_URL || 'http://localhost:6379';

var redisParse = url.parse(redisUrl);

var redis = {
  host: redisParse.hostname,
  port: redisParse.port,
  pass: (redisParse.auth) ? redisParse.auth.split(':')[1] : null
};

var forceSSL = ENV.FORCE_SSL === 'true' ? true : false;

var DEFAULTS = {
  port: 3000,
  host: 'https://cdn.goinstant.net',
  path: '/v1/platform.min.js'
};

var config = {
  server: {
    forceSSL: forceSSL,
    port: ENV.PORT || DEFAULTS.port,
    secret: ENV.SECRET,
    redis: redis
  },
  platform: {
    host: ENV.GOINSTANT_HOST || DEFAULTS.host,
    path: ENV.PLATFORM_PATH || DEFAULTS.path
  },
  goinstant: {
    connectUrl: ENV.GOINSTANT_CONNECT_URL,
    secret: ENV.GOINSTANT_APP_SECRET,
    iss: ENV.GOINSTANT_ISS || LOCAL_ISS
  },
  xirsys: {
    secret: ENV.XIRSYS_SECRET,
    ident: ENV.XIRSYS_IDENT,
    domain: ENV.XIRSYS_DOMAIN,
    room: ENV.XIRSYS_ROOM || 'default',
    app: ENV.XIRSYS_APP || 'default'
  }
};

/**
 * @exports
 */
module.exports = config;
