(function() {
  
  'use strict';
  
  var React = require('React');
  var Dispatcher = require('../dispatcher');
  var Loader = require('react-loader');
  var Track = require('./Track.jsx');
  var IO = require('socket.io-client');
  var GameService = require('../services/GameService');
  
  var GameComponent = React.createClass({
    
    contextTypes: {
      router: React.PropTypes.func
    },
    
    getInitialState: function() {
      return {};
    },
    
    componentDidMount: function() {
      var self = this;
      self.socket = IO('http://localhost:4000');
      self.socket.on('connect', function() {
        self.socket.emit('hi');
      });
      self.socket.on('hi', function() {
        console.log('Server says Hi!');
      });
      self.socket.on('disconnect', function() {
        console.log('Lost connection to the server...');
      });
    },
    
    componentWillUnmount: function() {
      this.socket.disconnect();
    },
    
    render: function() {
      return null;
    }
    
  });
  
  module.exports = GameComponent;
  
})();