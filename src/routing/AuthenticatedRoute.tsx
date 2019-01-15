import { StorageConstantsEnum, StorageInstance } from "@lightbot/browser-storage";
import * as React from "react";
import { compose } from "react-apollo";
import { Route, RouteComponentProps, RouteProps, withRouter } from "react-router-dom";

import { RoutesKeysEnum } from "./routeKeys.enum";
import { routes } from "./routes";

type AuthenticatedRouteProps = RouteProps & RouteComponentProps & {};

class AuthenticatedRouteDisconnected extends React.Component<AuthenticatedRouteProps> {
  constructor(props: AuthenticatedRouteProps) {
    super(props);
    this.tryRedirect(props);
  }

  public componentDidUpdate() {
    this.tryRedirect();
  }

  public render() {
    const { component: Component, ...props } = this.props;
    return <Route {...props} render={this.renderComponent(Component)} />;
  }

  private renderComponent = Component => props => {
    return <Component {...props} />;
  };

  private tryRedirect(props: AuthenticatedRouteProps = this.props) {
    const { history } = props;
    const isAuthenticated = !!StorageInstance.getItem(StorageConstantsEnum.EDITOR_TOKEN_ID);

    if (!isAuthenticated) {
      history.push(routes[RoutesKeysEnum.LOGIN].routeProps.path as string);
    }
  }
}

export const AuthenticatedRoute = compose(withRouter)(AuthenticatedRouteDisconnected);
