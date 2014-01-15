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
var LEAVE_MODAL_CLASS = 'leave-modal';
var CHAT_KEY = 'goinstant/widgets/chat/messages';

function Demo(config) {
  this._config = config;

  this._room = null;
  this._host = config.host;

  this._webrtcContainer = config.webrtcContainer;
  this._webrtcList = config.webrtcList;
  this._chatContainer = config.chatContainer;

  this._webRTC = null;
  this._chat = null;
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
    window.room = room;

    cb();
  });
};

Demo.prototype._initializeWidgets = function(cb) {
  var userColors = new UserColors({
    room: this._room
  });

  this._webRTC = new WebRTC({
    room: this._room,
    expandContainer: this._webrtcContainer,
    listContainer: this._webrtcList,
    autoStart: true
  });

  this._chat = new Chat({
    room: this._room,
    container: this._chatContainer,
    messageExpiry: 1000 * 60 * 60 * 24
  });

  var tasks = [
    _.bind(userColors.choose, userColors),
    _.bind(this._webRTC.initialize, this._webRTC),
    _.bind(this._chat.initialize, this._chat)
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
  var $leaveModal = $('.' + LEAVE_MODAL_CLASS);

  if (this._host === this._room.name) {
    $leaveButton.css('display', 'block');

    this._room.self().key('host').set(this._host, function(err) {
      if (err) {
        return cb(err);
      }
    });
  }

  var self = this;

  $leaveButton.on('click', function() {
    if (self._host === self._room.name) {
      self._room.key(CHAT_KEY).remove(function(err) {
        if (err) {
          throw err;
        }

        self._room.leave();
        $leaveButton.css('display', 'none');
      });
    }
    $('section').css('display', 'none');
  });

  var options = {
    local: true,
    listener: function(userObj) {
      if (userObj.host === self._room.name) {
        var tasks = [
          _.bind(self._webRTC.destroy, self._webRTC),
          _.bind(self._chat.destroy, self._chat)
        ];

        async.parallel(tasks, function(err) {
          if (err) {
            throw err;
          }

          $leaveModal.css('display', 'block');
        });
      }
    }
  };

  this._room.on('leave', options);
};

return Demo;

})();
