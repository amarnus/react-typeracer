(function() {
  
  'use strict';
  
  var React = require('React');
  var Dispatcher = require('../dispatcher');
  var UserSummary = require('./UserSummary.jsx');
  var CurrentUserStore = require('../stores/CurrentUserStore');
  var CurrentGameStore = require('../stores/CurrentGameStore');
  var Loader = require('react-loader');
  var Cookies = require('cookies-js');
  var GameService = require('../services/GameService');
  
  var WelcomeComponent = React.createClass({
    
    contextTypes: {
      router: React.PropTypes.func
    },
    
    getInitialState: function() {
      return {
        currentUser: {},
        loaded: false,
        playGameError: null
      };
    },
    
    _onChange: function(currentUser) {
      this.setState({ currentUser: currentUser });
    },
    
    componentWillMount: function() {
      var gameId = CurrentGameStore.getGame();
      if (gameId) {
        this.redirectToGame(gameId);
      }
      return false;
    },
    
    componentDidMount: function() {
      var self = this;
      CurrentUserStore.on('change', this._onChange);
      CurrentUserStore.fetchInfo(function() {
        self.setState({ loaded: true });
      });
    },
    
    componentWillUnmount: function() {
      CurrentUserStore.removeListener('change', this._onChange);
    },
    
    redirectToGame: function(gameId) {
      console.log('Redirecting...');
      this.context.router.transitionTo('game', {}, { game_id: gameId });
    },
    
    onExitLinkClick: function(evt) {
      evt.preventDefault();
      Cookies.expire('typeracer_server.sid')
      this.context.router.transitionTo('enterName');
    },
    
    onPlayGameClick: function() {
      var self = this;
      self.setState({ playGameError: null });
      GameService.createOrJoinGame(function(err, payload) {
        if (err) {
          return self.setState({ playGameError: err });
        }
        self.redirectToGame(payload.game_id);
      });
    },
    
    render: function() {
      var userInfo = this.state.currentUser.info || {};
      var userSummary;
      var playGameError;
      userInfo.stats = userInfo.stats || {};
      if (this.state.currentUser._failed) {
        userSummary = <div className="text-error-message">{this.state.currentUser._failed}</div>;
      }
      else {
        userSummary = <UserSummary averageSpeed={userInfo.stats.average_speed} matchesPlayed={userInfo.stats.matches_played} />;
      }
      if (this.state.playGameError) {
        playGameError = <div className="text-error-message">{ this.state.playGameError }</div>
      }
      return <div className="welcome-screen">
            <a href="" onClick={this.onExitLinkClick}>Logout</a>
            <Loader loaded={this.state.loaded}>
              <h1>Welcome { userInfo.name }!</h1>
              { userSummary }
              <button className="play-game" onClick={this.onPlayGameClick}>Play</button>
              { playGameError }
            </Loader>
          </div>;
    }
    
  });
  
  module.exports = WelcomeComponent;
  
})();