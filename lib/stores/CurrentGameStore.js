(function() {
  
  'use strict';
  
  var util = require('util');
  var EventEmitter = require('events').EventEmitter;
  var Dispatcher = require('../dispatcher');
  var _ = require('lodash');
  
  var CurrentGameStore = function() {
    this.currentGame = {
      game_id: null
    };
  };
  
  util.inherits(CurrentGameStore, EventEmitter);
  
  CurrentGameStore.prototype.getGame = function() {
    return this.currentGame.game_id;
  };
  
  module.exports = new CurrentGameStore();
  
})();