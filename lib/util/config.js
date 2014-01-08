/*jshint node:true */

'use strict';

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
  account: {
    name: ENV.ACCOUNT_NAME,
    app: ENV.ACCOUNT_APP
  },
  app: {
    secret: ENV.APP_SECRET,
    iss: ENV.APP_ISS
  }
};

module.exports = config;
