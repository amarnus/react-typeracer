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
  
  var GameService = function() {};
  
  GameService.prototype.createOrJoinGame = function(cb) {
    request({
      method: 'POST',
      url: '/game/join',
      headers: {
        'Content-Type': 'application/json'
      }
    }, function(err, response, body) {
      if (err || !(response.statusCode + '').match(/^2/)) {
        return  cb(extractFetchFailureReason(err, response, body));
      }
      cb(null, JSON.parse(body));
    });
  };
  
  module.exports = new GameService();
  
})();