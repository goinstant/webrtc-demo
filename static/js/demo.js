/*jshint node: false */

window.goinstant = window.goinstant || {};
window.goinstant.WebRTCDemo = (function() {

'use strict';

/**
 * Dependencies
 */
var $ = window.$;
var async = window.async;
var _ = window._;
var goinstant = window.goinstant;

/**
 * Widgets
 */
var WebRTC = goinstant.widgets.WebRTC;
var Chat = goinstant.widgets.Chat;
var UserColors = goinstant.widgets.UserColors;

/**
 * @const
 */
var LEAVE_CLASS = 'leave-button';

function Demo(config) {
  this._config = config;

  this._room = null;
  this._isHost = config.host;
  this._webrtcContainer = config.webrtcContainer;
  this._webrtcList = config.webrtcList;
  this._chatContainer = config.chatContainer;
}

Demo.prototype.initialize = function(cb) {
  var tasks = [
    _.bind(this._goinstantConnect, this),
    _.bind(this._initializeWidgets, this),
    _.bind(this._setupHost, this)
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
    expandContainer: this._webrtcContainer,
    listContainer: this._webrtcList,
    autoStart: true
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

Demo.prototype._setupHost = function(cb) {
  var $leaveButton = $('.' + LEAVE_CLASS);

  if (this._isHost) {
    $leaveButton.css('display', 'block');

    this._room.self().key('host').set(true, function(err) {
      if (err) {
        return cb(err);
      }
    });
  }

  $leaveButton.on('click', function() {
    if (this._isHost) {
      console.log('remove keys');
    }
  });

  this._room.on('leave', function(userObj) {
    if (userObj.host) {
      console.log('timeout, host left');
    }
  });
};

return Demo;

})();
