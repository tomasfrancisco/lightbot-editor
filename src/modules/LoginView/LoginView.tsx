import { StorageConstantsEnum, StorageInstance } from "@lightbot/browser-storage";
import { message } from "antd";
import * as React from "react";
import { compose, withApollo, WithApolloClient } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RoutesKeysEnum, Routing } from "~/routing";

import { ON_AUTH } from "./apollo/gql/onAuth";
import { Form, Wrapper } from "./components";

export type LoginViewProps = WithApolloClient<any> & RouteComponentProps & {};

type LoginViewState = {
  isAuthenticated: boolean;
};

class LoginViewDisconnected extends React.PureComponent<LoginViewProps, LoginViewState> {
  constructor(props: LoginViewProps) {
    super(props);

    this.tryRedirectToDashboard(props);
  }

  public render() {
    return (
      <Wrapper>
        <Form onSubmit={this.onSubmit} />
      </Wrapper>
    );
  }

  private authenticate = async () => {
    const { client } = this.props;
    try {
      await client.query({
        query: ON_AUTH,
      });

      this.tryRedirectToDashboard();

      message.success("Future is now unlocked! To infinity... and beyond! 🚀");
    } catch (err) {
      this.setState({
        isAuthenticated: false,
      });
      message.error("Please provide a valid token.");
      StorageInstance.removeItem(StorageConstantsEnum.EDITOR_TOKEN_ID);
    }
  };

  private onSubmit = token => {
    StorageInstance.setItem(StorageConstantsEnum.EDITOR_TOKEN_ID, token);
    this.authenticate();
  };

  private tryRedirectToDashboard(props: LoginViewProps = this.props) {
    const { history } = props;
    const isAuthenticated = !!StorageInstance.getItem(StorageConstantsEnum.EDITOR_TOKEN_ID);

    if (isAuthenticated) {
      history.push(Routing.routes[RoutesKeysEnum.DASHBOARD].routeProps.path);
    }
  }
}

export const LoginView = compose(
  withApollo,
  withRouter,
)(LoginViewDisconnected);
