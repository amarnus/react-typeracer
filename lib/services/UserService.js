(function() {
  
  'use strict';
  
  var request = require('browser-request');
  var _ = require('lodash');
  
  request.defaults({
    baseUrl: 'http://localhost:4000',
    timeout: 10000,
    time: true  
  });
  
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
  
  var UserService = function() {};
  
  UserService.prototype.getCurrentUser = function(cb) {
    request({
      method: 'GET',
      url: '/player/me'
    }, function(err, response, body) {
      if (err || !(response.statusCode + '').match(/^2/)) {
        return cb(extractFetchFailureReason(err, response, body));
      }
      cb(null, JSON.parse(body));
    });
  };
  
  UserService.prototype.enterUser = function(name, cb) {
    request({
      method: 'POST',
      url: '/player/enter',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name  
      })
    }, function(err, response, body) {
      if (err || !(response.statusCode + '').match(/^2/)) {
        return  cb(extractFetchFailureReason(err, response, body));
      }
      cb();
    });
  };
  
  UserService.prototype.exitUser = function(cb) {
    request({
      method: 'POST',
      url: '/player/exit'
    }, function(err, response, body) {
      if (err || !(response.statusCode + '').match(/^2/)) {
        return  cb(extractFetchFailureReason(err, response, body));
      }
      cb();
    });
  };
  
  module.exports = new UserService();
  
})();