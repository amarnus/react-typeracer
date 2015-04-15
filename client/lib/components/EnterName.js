(function() {
  
  'use strict';
  
  var React = require('React');
  var Dispatcher = require('../dispatcher');
  var $ = require('jquery');
  
  var EnterNameComponent = React.createClass({
    
    contextTypes: {
      router: React.PropTypes.func
    },
    
    componentWillMount: function() {
      var self = this;
      if (sessionStorage.getItem('name')) {
        this.context.router.transitionTo('welcome'); 
      }
    },

    enterName: function(evt) {
      var self = this;
      evt.preventDefault();
      var enteredName = $('form#nameForm input[name="name"]').val();
      if (enteredName.length) {
        sessionStorage.setItem('name', enteredName);
        self.context.router.transitionTo('welcome');
      }
      else {
        alert('Please enter a name to start playing.'); 
      }
    },
    
    render: function() {
      return <form className="form" id="nameForm">
        <div className="form-control">
          <div><label htmlFor="name">What's your name?</label></div>
          <input name="name" type="textfield" autoFocus={true} />&nbsp;
          <button type="submit" onClick={this.enterName}>Enter &rarr;</button>
        </div>
      </form>;
    }
    
  });
  
  module.exports = EnterNameComponent;
  
})();