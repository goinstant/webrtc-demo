/*jshint node:true */

'use strict';

/**
 * @requires
 */
var _ = require('lodash');

/**
 * @const
 */
var ENV = process.env;
var NODE_ENV = ENV.NODE_ENV || 'local';

var local = {
  iss: 'localhost/auth'
};

local.redisUrl = (NODE_ENV !== 'local') ?
  'http://localhost:6379' : ENV.REDISCLOUD_URL;

var DEFAULTS = {
  port: 3000,
  host: 'https://cdn.goinstant.net',
  path: '/v1/platform.min.js',
  redisUrl: local.redisUrl
};

var config = {
  server: {
    port: ENV.PORT || DEFAULTS.port,
    secret: ENV.SECRET,
    redisUrl: ENV.REDIS_URL || DEFAULTS.redisUrl
  },
  platform: {
    host: ENV.GOINSTANT_HOST || DEFAULTS.host,
    path: ENV.PLATFORM_PATH || DEFAULTS.path
  },
  goinstant: {
    connectUrl: ENV.GOINSTANT_CONNECT_URL,
    secret: ENV.GOINSTANT_APP_SECRET,
    iss: ENV.GOINSTANT_ISS || local.iss
  }
};

/**
 * @exports
 */
module.exports = config;
