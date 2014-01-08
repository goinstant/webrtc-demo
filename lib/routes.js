/*jshint node:true */

'use strict';

/**
 * @requires
 */
var demo = require('./controllers/demo');
var errors = require('./controllers/errors');
var verify = require('./middleware/verify');

var routes = exports;
exports.constructor = function routes() {};

routes.load = function(app) {
  app.get('/', demo.home);

  app.post('/auth', demo.auth);

  app.get('/conference/:room', verify.room, verify.token, demo.join);

  app.get('/conference', verify.token, demo.create);

  app.get('*', errors.notFound);
};
