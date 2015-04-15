(function() {
  
  'use strict';
  
  var util = require('util');
  var EventEmitter = require('events').EventEmitter;
  var Dispatcher = require('../dispatcher');
  var _ = require('lodash');
  var UserService = require('../services/UserService');
  
  var CurrentUserStore = function() {
    this.currentUser = {
      info: null,
      _failed: false
    };
  };
  
  util.inherits(CurrentUserStore, EventEmitter);
  
  CurrentUserStore.prototype.fetchInfo = function(cb) {
    var self = this;
    cb = cb || (function() {});
    UserService.getCurrentUser(function(err, user) {
      if (err) {
        self.currentUser = {
          info: null,
          _failed: extractFetchFailureReason(err, response, body)
        };
        self.emit('change', self.currentUser);
        return cb(err);
      }
      self.currentUser = {
        info: user,
        _failed: false
      };
      self.emit('change', self.currentUser);
      cb();
    });
  };
  
  module.exports = new CurrentUserStore();
  
})();