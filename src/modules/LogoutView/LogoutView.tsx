import { message } from "antd";
import { StorageConstantsEnum, StorageInstance } from "lightbot-ssot/lib";
import * as React from "react";
import { compose, withApollo, WithApolloClient } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Loading } from "src/components/Loading";
import { RoutesKeysEnum, Routing } from "src/routing";

type LogoutProps = WithApolloClient<any> & RouteComponentProps;

class LogoutViewDisconnected extends React.Component<LogoutProps> {
  public componentDidMount() {
    const { client, history } = this.props;

    // Remove token from local storage
    StorageInstance.removeItem(StorageConstantsEnum.EDITOR_TOKEN_ID);

    // Resets local cache
    client.resetStore();

    // Redirects to login
    history.push(Routing.routes[RoutesKeysEnum.LOGIN].routeProps.path);

    message.success("Logged out successfully!");
  }

  public render() {
    return <Loading />;
  }
}

export const LogoutView = compose(
  withApollo,
  withRouter,
)(LogoutViewDisconnected);
