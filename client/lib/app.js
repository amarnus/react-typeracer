(function() {
  
  var React = require('react');
  var Router = require('react-router');
  var Route = Router.Route;
  var DefaultRoute = Router.DefaultRoute;
  var NotFoundRoute = Router.NotFoundRoute;
  var RouteHandler = Router.RouteHandler;
  var NameComponent = require('./components/EnterName');
  var WelcomeComponent = require('./components/Welcome');
  
  console.debug('...and here we go.');
  
  var App = React.createClass({
    render: function() {
      return ( <RouteHandler /> ); // <div ui-view></div>
    }
  });
  
  var NotFound = App;

  var routes = (
    <Route handler={App} path="/">
      <DefaultRoute handler={NameComponent} />
      <Route name="enterName" handler={NameComponent} />
      <Route name="welcome" handler={WelcomeComponent} />
      <NotFoundRoute handler={NotFound}/>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
  });
  
})();