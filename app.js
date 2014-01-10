/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./lib/routes');
var http = require('http');
var path = require('path');
var config = require('./lib/util/config');
var RedisStore = require('connect-redis')(express);
var ejsLocals = require('ejs-locals');

var app = express();

app.configure(function() {
  app.set('env', process.env.NODE_ENV || 'local');
  app.set('port', config.server.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('ejs', ejsLocals);
  app.locals({
    _layoutFile: 'layout',
    title: 'GoInstant WebRTC Demo'
  });
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'static')));
  app.use(express.session({
    secret: config.server.secret,
    store: new RedisStore(config.server.redis)
  }));
});

// Load the routes
routes.load(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
