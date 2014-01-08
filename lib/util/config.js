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
  goinstant: {
    account: ENV.GOINSTANT_ACCOUNT,
    app: {
      name: ENV.GOINSTANT_APP_NAME,
      secret: ENV.GOINSTANT_APP_SECRET,
      iss: ENV.GOINSTANT_APP_ISS
    }
  }
};

module.exports = config;
