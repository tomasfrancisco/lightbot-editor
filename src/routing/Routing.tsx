import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";

import { AuthenticatedRoute } from "./AuthenticatedRoute";
import { browserHistory } from "./browserHistory";
import { LightbotRouteProps, routes } from "./routes";
import { findMatchedRoute } from "./utils";

/**
 * Routing exports mostly of the utils so index doesn't mess up with
 * the order of imports.
 */
export class Routing extends React.Component {
  public static browserHistory = browserHistory;
  public static routes = routes;
  public static utils = {
    findMatchedRoute
  };

  public render() {
    return (
      <Router history={browserHistory}>
        <Switch>{this.renderRoutes()}</Switch>
      </Router>
    );
  }

  private renderRoutes() {
    return Object.keys(routes).map(routeKey => {
      const route: LightbotRouteProps = routes[routeKey];

      const RouteComponent = route.protected ? AuthenticatedRoute : Route;

      return <RouteComponent key={routeKey} {...route.routeProps} />;
    });
  }
}
