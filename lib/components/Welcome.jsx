(function() {
  
  'use strict';
  
  var React = require('React');
  var Dispatcher = require('../dispatcher');
  var UserSummary = require('./UserSummary.jsx');
  var CurrentUserStore = require('../stores/CurrentUserStore');
  var Loader = require('react-loader');
  
  // @TODO Handle user information load failed at this level.
  var WelcomeComponent = React.createClass({
    
    contextTypes: {
      router: React.PropTypes.func
    },
    
    getInitialState: function() {
      return {
        name: sessionStorage.getItem('name'),
        currentUser: {},
        loaded: false
      };
    },
    
    componentDidMount: function() {
      var self = this;
      // Bind event handlers.
      CurrentUserStore.on('change', function(currentUser) {
        self.setState({ currentUser: currentUser });
      });
      CurrentUserStore.fetchInfo(function() {
        self.setState({ loaded: true });
      });
    },
    
    _logout: function() {
      sessionStorage.removeItem('name');
      this.context.router.transitionTo(); // no args => Home page
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
            <h1>Welcome {this.state.name}!</h1>
            <a href="" onClick={this._logout}>Logout</a>
            <Loader loaded={this.state.loaded}>
              { userSummary }
            </Loader>
          </div>;
    }
    
  });
  
  module.exports = WelcomeComponent;
  
})();