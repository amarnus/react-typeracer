(function() {
  
  'use strict';
  
  var util = require('util');
  var EventEmitter = require('events').EventEmitter;
  var Dispatcher = require('../dispatcher');
  var request = require('browser-request');
  var _ = require('lodash');
  
  function extractFetchFailureReason(err, response, body) {
    if (err) {
      if (_.isObject(err) && err.message) {
        return err.message; 
      }
      return err;
    }
    try {
      var payload = JSON.parse(body);
      return payload.message;
    }
    catch(e) {
      return body; 
    }
  }
  
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
    
    request({
      method: 'GET',
      url: '/player/me',
      baseUrl: 'http://localhost:4000',
      timeout: 10000,
      time: true
    },
    function(err, response, body) {
      if (err || !(response.statusCode + '').match(/^2/)) {
        self.currentUser = {
          info: null,
          _failed: extractFetchFailureReason(err, response, body)
        };
        self.emit('change', self.currentUser);
        return cb(err);
      }
      self.currentUser = {
        info: JSON.parse(body),
        _failed: false
      };
      self.emit('change', self.currentUser);
    });
  
  };
  
  module.exports = new CurrentUserStore();
  
})();