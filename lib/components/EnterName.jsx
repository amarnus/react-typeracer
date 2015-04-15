(function() {
  
  'use strict';
  
  var React = require('React');
  var Dispatcher = require('../dispatcher');
  var $ = require('jquery');
  var Cookies = require('cookies-js');
  var UserService = require('../services/UserService');
  
  var EnterNameComponent = React.createClass({
  
    getInitialState: function() {
      return {
        errorMessage: null
      };
    },
    
    contextTypes: {
      router: React.PropTypes.func
    },
    
    componentWillMount: function() {
      var self = this;
      if (Cookies.get('typeracer_server.sid')) {
        this.context.router.transitionTo('welcome'); 
      }
    },

    onNameSubmit: function(evt) {
      var self = this;
      evt.preventDefault();
      var enteredName = $('form#nameForm input[name="name"]').val();
      if (enteredName.length) {
        UserService.enterUser(enteredName, function(err, res, body) {
          if (err) {
            return self.setState({ errorMessage: err });
          }
          self.context.router.transitionTo('welcome');
        });
      }
      else {
        self.setState({ errorMessage: 'Please enter a name to start playing' });
      }
    },
    
    render: function() {
      var errorMessage = null;
      if (this.state.errorMessage) {
        errorMessage = <div className="text-error-message">{this.state.errorMessage}</div>;
      }
      return <form className="form" id="nameForm">
        <div className="form-control">
          <div><label htmlFor="name">What's your name?</label></div>
          <input name="name" type="textfield" autoFocus={true} onKeyUp={this.onNameKeyUp}/>
          <button type="submit" onClick={this.onNameSubmit}>Enter &rarr;</button>
          {errorMessage}
        </div>
      </form>;
    }
    
  });
  
  module.exports = EnterNameComponent;
  
})();