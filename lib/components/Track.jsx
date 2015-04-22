(function() {

  'use strict';
  
  var React = require('react');
  var $ = require('jquery');
  var _ = require('lodash');
  
  // @TODO: Clean exit for the car.
  // @TODO: Starting line.
  // @TODO: Move TrackBricks, TrackDividers, Car to their own components.
  // @TODO: Move inline CSS styles to CSS.
  var Track = React.createClass({
    
    getInitialState: function() {
      return {
        trackWidth: null,
        trackHeight: this.props.height || 100,
        carSpeed: 2,
        carStartAt: new Date().getTime()
      };
    },
    
    componentDidMount: function() {
      var $track = $(this.getDOMNode());
      this.setState({
        trackWidth: $track.width(),
        trackHeight: $track.height()
      }, function() {
        console.log('Found track width to be ' + this.state.trackWidth + '...');
        console.log('Found track height to be ' + this.state.trackHeight + '...');
      });
      this.startTimer();
    },
    
    startTimer: function() {
      var self = this;
      this._timer = window.setInterval(function() {
        // https://groups.google.com/forum/#!topic/reactjs/KrcFKbUFwp8
        self.forceUpdate();
      }, 17);
    },
    
    stopTimer: function() {
      if (this._timer) {
        window.clearInterval(this._timer); 
      }
    },
    
    render: function() {
      var trackStyle = {
        position: 'relative',
        backgroundColor: 'black',
        width: '100%',
        height: this.state.trackHeight || this.props.trackHeight,
        boxSizing: 'border-box'
      };
      
      /* Bricks */
      var bricks = _.map(_.range(0, (this.state.trackWidth/10) - 1), function(i) {
        var style = {
          width: 10,
          height: 5,
          backgroundColor: 'red',
          display: 'inline-block',
          border: 'solid thin #888',
          boxSizing: 'border-box'
        };
        if (i % 2 === 0) {
           style.backgroundColor = 'white';
        }
        return <div className="brick" key={i} style={style}></div>
      });
      bricks = <div className="bricks">{bricks}</div>;
      
      /* Dividers */
      var dividerStyle = {
        position: 'absolute',
        display: 'inline-block',
        backgroundColor: 'white',
        width: 20,
        height: trackStyle.height * 0.05,
        opacity: 0.3
      };
      dividerStyle.top = (trackStyle.height/2) - (dividerStyle.height / 2);
      var dividers = [];
      var i = 1;
      var dividerOffset = dividerStyle.width + dividerStyle.width * 0.80;
      dividerStyle.left = dividerStyle.width * 0.80;
      do {
        dividers.push(<span className="track-divider" key={i} style={_.clone(dividerStyle)}></span>);
        dividerStyle.left = i * dividerStyle.width + (i + 1) * (dividerStyle.width * 0.80);
        i++;
      } while( (dividerStyle.left + dividerOffset) < this.state.trackWidth );
    
      /* Car */
      var carStyle = {
        position: 'absolute',
        backgroundColor: 'yellow',
        width: 30,
        height: trackStyle.height * 0.30,
        zIndex: 1
      };
      carStyle.top = (trackStyle.height/2) - (carStyle.height / 2);
      var carOffset = carStyle.width * 0.60;
      var dtInMs = new Date().getTime() - this.state.carStartAt;
      var carSpeedPx = ( 500 - (carOffset * 2) ) * this.state.carSpeed / 500;
      carStyle.left = dtInMs/10 * carSpeedPx;
      // Go off-screen.
      if ( carStyle.left >= this.state.trackWidth ) { 
        carStyle.display = 'none';
        this.stopTimer();
      }
      this.prevCarPos = carStyle.left;
      var car = <div className="car" style={carStyle}></div>;
  
      return <div className="track">
        { bricks }
        <div className="inner" style={trackStyle}>{ dividers }{ car }</div>
        { bricks }
        </div>;
    }
    
  });
  
  module.exports = Track;

})();