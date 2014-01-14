/*jshint node:true */
'use strict';

/**
 * @requires
 */
var config = require('../util/config');

/**
 * @exports
 */
var forceSSL = exports;
forceSSL.constructor = function forceSSL() {};

forceSSL.force = function(req, res, next) {
  if (!config.server.forceSSL) {
    return next();
  }

  if (req.get('x-forwarded-proto') != "https") {
    res.set('x-forwarded-proto', 'https');

    return res.redirect('https://' + req.get('host') + req.url);
  }

  return next();
};
