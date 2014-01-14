/*jshint node:true */

'use strict';

/**
 * @requires
 */
var demo = require('./controllers/demo');
var errors = require('./controllers/errors');
var forceSSL = require('./controllers/force_ssl');
var verify = require('./verify');

var routes = exports;
exports.constructor = function routes() {};

routes.load = function(app) {
  app.all('*', forceSSL.force);

  app.get('/', demo.home);

  app.post('/auth', demo.auth);

  app.get('/conference/:room', verify.room, verify.token, demo.join);

  app.get('/conference', verify.token, demo.create);

  app.get('*', errors.notFound);
};
