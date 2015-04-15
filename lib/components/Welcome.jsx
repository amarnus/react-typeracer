(function() {
  
  'use strict';
  
  var React = require('React');
  var Dispatcher = require('../dispatcher');
  var UserSummary = require('./UserSummary.jsx');
  var CurrentUserStore = require('../stores/CurrentUserStore');
  var Loader = require('react-loader');
  var Cookies = require('cookies-js');
  
  var WelcomeComponent = React.createClass({
    
    contextTypes: {
      router: React.PropTypes.func
    },
    
    getInitialState: function() {
      return {
        currentUser: {},
        loaded: false
      };
    },
    
    _onChange: function(currentUser) {
      this.setState({ currentUser: currentUser });
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
    
    onExitLinkClick: function(evt) {
      evt.preventDefault();
      Cookies.expire('typeracer_server.sid')
      this.context.router.transitionTo('enterName');
    },
    
    render: function() {
      var userInfo = this.state.currentUser.info || {};
      var userSummary;
      if (this.state.currentUser._failed) {
        userSummary = <div className="text-error-message">{this.state.currentUser._failed}</div>;
      }
      else {
        userSummary = <UserSummary averageSpeed={userInfo.average_speed} matchesPlayed={userInfo.matches_played} />;
      }
      return <div className="welcome-screen">
            <a href="" onClick={this.onExitLinkClick}>Logout</a>
            <Loader loaded={this.state.loaded}>
              <h1>Welcome { userInfo.name }!</h1>
              { userSummary }
            </Loader>
          </div>;
    }
    
  });
  
  module.exports = WelcomeComponent;
  
})();