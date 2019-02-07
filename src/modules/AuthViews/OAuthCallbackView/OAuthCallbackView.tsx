import * as React from "react";
import { AppBackground } from "src/components/AppBackground";
import { PaperSheet } from "src/components/PaperSheet";
import { withRouter, RouteComponentProps, Redirect } from "react-router";
import { compose } from "react-apollo";
import queryString from "query-string";
import { routes } from "src/routing/routes";
import { Routing, RoutesKeysEnum } from "src/routing";
import { authenticationHelper } from "src/utils/authenticationHelper";

type OAuthCallbackViewProps = RouteComponentProps & {};

class OAuthCallbackViewDisconnected extends React.Component<OAuthCallbackViewProps> {
  public render() {
    return (
      <AppBackground>
        <PaperSheet>
          <h1>{this.isSuccessful ? "Success 🎉" : "Failure 😩"}</h1>
          {this.isSuccessful ? (
            <Redirect to={Routing.routes[RoutesKeysEnum.DASHBOARD].routeProps.path} />
          ) : null}
        </PaperSheet>
      </AppBackground>
    );
  }

  private get isSuccessful() {
    const {
      location: { search },
    } = this.props;
    const queryParams = queryString.parse(search);
    const isSuccessful = queryParams.success === "true";

    authenticationHelper.isAuthenticated = isSuccessful;

    return isSuccessful;
  }
}

export const OAuthCallbackView = compose(withRouter)(OAuthCallbackViewDisconnected);
