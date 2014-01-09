/*jshint node: false */

window.goinstant = window.goinstant || {};
window.goinstant.WebRTCDemo = (function() {

'use strict';

/**
 * Dependencies
 */
var async = window.async;
var _ = window._;
var goinstant = window.goinstant;

/**
 * Widgets
 */
var WebRTC = goinstant.widgets.WebRTC;
var Chat = goinstant.widgets.Chat;
var UserColors = goinstant.widgets.UserColors;

function Demo(config) {
  this._config = config;

  this._room = null;
  this._webrtcContainer = config.webrtcContainer;
  this._chatContainer = config.chatContainer;
}

Demo.prototype.initialize = function(cb) {
  var tasks = [
    _.bind(this._goinstantConnect, this),
    _.bind(this._initializeWidgets, this)
  ];

  async.series(tasks, function(err) {
    if (err) {
      return cb(err);
    }

    cb();
  });
};

Demo.prototype._goinstantConnect = function(cb) {
  var url = this._config.url;
  var options = {
    user: this._config.token,
    room: this._config.room
  };

  var self = this;

  goinstant.connect(url, options, function(err, connection, room) {
    if (err) {
      return cb(err);
    }

    self._room = room;

    cb();
  });
};

Demo.prototype._initializeWidgets = function(cb) {
  var userColors = new UserColors({
    room: this._room
  });

  var webRTC = new WebRTC({
    room: this._room,
    expandContainer: this._webrtcContainer
  });

  var chat = new Chat({
    room: this._room,
    container: this._chatContainer
  });

  var tasks = [
    _.bind(userColors.choose, userColors),
    _.bind(webRTC.initialize, webRTC),
    _.bind(chat.initialize, chat)
  ];

  async.series(tasks, function(err) {
    if (err) {
      return cb(err);
    }

    cb();
  });
};

return Demo;

})();
