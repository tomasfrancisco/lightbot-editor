import pathToRegexp from "path-to-regexp";
import * as React from "react";
import { compose } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { Loading } from "~/components/Loading";
import { Agent } from "~/models";
import { RoutesKeysEnum, Routing } from "~/routing";

import { fetchAgents } from "./gql/fetchAgents";

export type DashboardViewProps = RouteComponentProps & {
  agents?: Agent[];
};

export type DashboardViewState = {};

class DashboardViewDisconnected extends React.Component<
  DashboardViewProps,
  DashboardViewState
> {
  public componentDidMount() {
    this.tryRedirectToDefault();
  }

  public componentDidUpdate() {
    this.tryRedirectToDefault();
  }

  public render() {
    return <Loading fullPage={true} />;
  }

  private tryRedirectToDefault() {
    const { history, agents } = this.props;
    if (agents && agents.length) {
      history.push(
        pathToRegexp.compile(Routing.routes[RoutesKeysEnum.DEFAULT].routeProps
          .path as string)({
          agentId: agents[0].id
        })
      );
    }
  }
}

export const DashboardView = compose(
  fetchAgents,
  withRouter
)(DashboardViewDisconnected);
