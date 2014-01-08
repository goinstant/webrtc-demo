/*jshint node:true */
'use strict';

/**
 * @exports
 */
var errors = exports;
errors.constructor = function errors() {};

errors.notFound = function(req, res) {
  res.render('not-found');
};
