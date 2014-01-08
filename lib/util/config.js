/*jshint node:true */

'use strict';

/**
 * @const
 */
var PROTOCOL = 'https://';
var WIDGETS = '/widgets/';
var VERSION = '/latest/';
var WEBRTC = 'webrtc';
var CHAT = 'chat';
var USER_COLORS = 'user-colors';

var ENV = process.env;

var config = {
  server: {
    port: ENV.SERVER_PORT,
    secret: ENV.SERVER_SECRET,
    redisUrl: ENV.SERVER_REDIS_URL
  },
  platform: {
    host: ENV.PLATFORM_HOST,
    path: ENV.PLATFORM_PATH,
    subdomain: ENV.PLATFORM_SUBDOMAIN,
  },
  goinstant: {
    account: ENV.GOINSTANT_ACCOUNT,
    app: {
      name: ENV.GOINSTANT_APP_NAME,
      secret: ENV.GOINSTANT_APP_SECRET,
      iss: ENV.GOINSTANT_APP_ISS
    }
  }
};

var CDN_URL = PROTOCOL + config.platform.subdomain + '.' + config.platform.host;
var CONNECT_URL = PROTOCOL + config.platform.host + '/';

config.data = {
  cdn: CDN_URL + config.platform.path,
  url: CONNECT_URL + config.goinstant.account + '/' + config.goinstant.app.name,
  widgets: {
    webRTC: {
      js: CDN_URL + WIDGETS + WEBRTC + VERSION + WEBRTC + '.min.js',
      css: CDN_URL + WIDGETS + WEBRTC + VERSION + WEBRTC + '.css',
    },
    chat: {
      js: CDN_URL + WIDGETS + CHAT + VERSION + CHAT + '.min.js',
      css: CDN_URL + WIDGETS + CHAT + VERSION + CHAT + '.css',
    },
    userColors: {
      js: CDN_URL + WIDGETS + USER_COLORS + VERSION + USER_COLORS + '.min.js'
    }
  }
};

module.exports = config;
