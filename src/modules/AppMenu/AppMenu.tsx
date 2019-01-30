import { Icon, Menu, Select } from "antd";
import _get from "lodash.get";
import pathToRegexp from "path-to-regexp";
import * as React from "react";
import { compose } from "react-apollo";
import { css } from "react-emotion";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Agent } from "src/models";
import { RoutesKeysEnum, Routing, withRouteParams } from "src/routing";

import { fetchAgents } from "../Dashboard/gql/fetchAgents";
import { renderMenuItem } from "./AppMenuItem";

const menuStyle = css`
  width: 256px;
  background-color: #252b2d;
  color: #fff;
  border-right: 0px;
`;

const agentSelectorStyle = css`
  width: 120px;
`;

const agentTitleStyle = css`
  margin-right: 10px;
`;

enum SubMenuEnum {
  COMPANY = "COMPANY",
  AGENT = "AGENT",
}

export type AppMenuProps = RouteComponentProps & {
  agents?: Agent[];
  agentId?: string;
};

class AppMenuDisconnected extends React.Component<AppMenuProps> {
  public render() {
    const { location, agentId, agents } = this.props;
    const selectedKey = Routing.utils.findMatchedRoute(location.pathname)![0]; // Gets the route key
    const selectedKeys = selectedKey ? [selectedKey] : [];

    const selectedAgent = (agents || []).find(agent => agent.id === agentId);

    return (
      <Menu
        className={menuStyle}
        defaultSelectedKeys={[RoutesKeysEnum.INTENTS]}
        selectedKeys={selectedKeys}
        mode="inline"
        defaultOpenKeys={[SubMenuEnum.COMPANY, SubMenuEnum.AGENT]}
      >
        <Menu.SubMenu
          key={SubMenuEnum.COMPANY}
          title={
            <span>
              <Icon type="global" />
              <span>Company</span>
            </span>
          }
        >
          {renderMenuItem({
            itemKey: RoutesKeysEnum.KEYWORDS,
            label: "Keywords",
            icon: "tags-o",
            to: pathToRegexp.compile(Routing.routes[RoutesKeysEnum.KEYWORDS].routeProps
              .path as string)({
              agentId,
            }),
          })}
          {renderMenuItem({
            itemKey: RoutesKeysEnum.SETTINGS,
            label: "Settings",
            icon: "setting",
            to: pathToRegexp.compile(Routing.routes[RoutesKeysEnum.SETTINGS].routeProps
              .path as string)({
              agentId,
            }),
          })}
        </Menu.SubMenu>
        <Menu.SubMenu key={SubMenuEnum.AGENT} title={this.renderAgentSubMenuTitle}>
          {renderMenuItem({
            itemKey: RoutesKeysEnum.INTENTS,
            label: "Build intents",
            icon: "message",
            to: pathToRegexp.compile(Routing.routes[RoutesKeysEnum.INTENTS].routeProps
              .path as string)({
              agentId,
            }),
          })}
          {renderMenuItem({
            itemKey: RoutesKeysEnum.DEPLOY,
            label: "Deploy",
            icon: "to-top",
            to: pathToRegexp.compile(Routing.routes[RoutesKeysEnum.DEPLOY].routeProps
              .path as string)({
              agentId,
            }),
          })}
          {renderMenuItem({
            itemKey: RoutesKeysEnum.IMPROVE,
            label: "Improve",
            icon: "book",
            badgeCount: _get(selectedAgent, "unknownTriggersCount"),
            to: pathToRegexp.compile(Routing.routes[RoutesKeysEnum.IMPROVE].routeProps
              .path as string)({
              agentId,
            }),
          })}
        </Menu.SubMenu>
        {renderMenuItem({
          itemKey: RoutesKeysEnum.LOGOUT,
          label: "Logout",
          icon: "logout",
          to: Routing.routes[RoutesKeysEnum.LOGOUT].routeProps.path,
        })}
      </Menu>
    );
  }

  private get renderAgentSubMenuTitle() {
    const { agents, agentId } = this.props;
    if (!agents) {
      return null;
    }

    return (
      <React.Fragment>
        <span className={agentTitleStyle}>
          <Icon type="solution" />
          <span>Agent</span>
        </span>
        <span onClick={this.preventPropagation}>
          <Select value={agentId} className={agentSelectorStyle} onChange={this.onAgentSelect}>
            {this.renderAgentsOptions()}
          </Select>
        </span>
      </React.Fragment>
    );
  }

  private renderAgentsOptions = () => {
    const { agents } = this.props;

    if (!agents) {
      return null;
    }

    return agents.map(agent => (
      <Select.Option key={agent.id} value={agent.id}>
        {agent.name}
      </Select.Option>
    ));
  };

  private preventPropagation = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  private onAgentSelect = agentId => {
    const { history, location } = this.props;
    const matchedPath = Routing.utils.findMatchedRoute(location.pathname)![1].routeProps.path;

    if (matchedPath) {
      const uri = pathToRegexp.compile(matchedPath)({ agentId });
      history.push(uri);
    }
  };
}

export const AppMenu = compose(
  withRouteParams(["agentId"]),
  withRouter,
  fetchAgents,
)(AppMenuDisconnected);
