(function() {
  
  'use strict';
  
  var React = require('react');
  var _ = require('lodash');
  
  var UserSummary = React.createClass({
    
    render: function() {
      return ( <div className="component component-user-summary">
                <h1>{ this.props.averageSpeed || 0 } <small>{ this.props.matchesPlayed }</small></h1>
              </div> );
    }
    
  });
  
  module.exports = UserSummary;
  
})();