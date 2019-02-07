import { Layout } from "antd";
import * as React from "react";
import { compose } from "react-apollo";
import { css } from "@emotion/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppLayout, AppLayoutContent } from "src/components/AppLayout";
import { Footer } from "src/components/Footer";
import { Logo } from "src/components/Logo";
import { ElementIdsType } from "src/constants/ElementIdsType";
import { Agent } from "src/models";
import { AppMenu } from "src/modules/AppMenu";

import { AppSider, LogoWrapper } from "./components";

const imgStyle = css`
  width: 12px;
  margin: 0 2px 0 5px;
`;

export type LightbotLayoutProps = RouteComponentProps & {
  loading?: boolean;
  agents?: Agent[];
};

export type LightbotLayoutState = {
  collapsed: boolean;
};

export class LightbotLayoutDisconnected extends React.Component<
  LightbotLayoutProps,
  LightbotLayoutState
> {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  public render() {
    const { children } = this.props;
    const year = new Date().getFullYear();
    const sideMenuId: ElementIdsType = "side-menu";
    return (
      <AppLayout>
        <AppSider
          id={sideMenuId}
          width={"256px"}
          collapsible={true}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          trigger={null}
        >
          <LogoWrapper isMobile={this.state.collapsed}>
            <Logo isMobile={this.state.collapsed} isDarkBackground={true} />
          </LogoWrapper>
          <AppMenu />
        </AppSider>
        <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
          <AppLayoutContent>{children || "Welcome to Lightbot!"}</AppLayoutContent>
          <Footer>
            © {year} • Lightbot is a registered trademark of{" "}
            <img css={imgStyle} src="/logo-icon-full.svg" /> Lightbase B.V. • Version -
            {" " + process.env.REACT_APP_VERSION}
          </Footer>
        </Layout>
      </AppLayout>
    );
  }

  private onCollapse = () => this.setState({ collapsed: !this.state.collapsed });
}

export const LightbotLayout = compose(withRouter)(LightbotLayoutDisconnected);
