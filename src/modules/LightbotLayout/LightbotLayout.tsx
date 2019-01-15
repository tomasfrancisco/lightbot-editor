import { Layout } from "antd";
import * as React from "react";
import { compose } from "react-apollo";
import { css } from "react-emotion";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppLayout, AppLayoutContent } from "~/components/AppLayout";
import { Footer } from "~/components/Footer";
import { Logo } from "~/components/Logo";
import { ElementIdsEnum } from "~/constants/ElementIdsEnum";
import { Agent } from "~/models";
import { AppMenu } from "~/modules/AppMenu";

import { AppSider } from "./components";

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
      collapsed: false
    };
  }

  public render() {
    const { children } = this.props;
    const year = new Date().getFullYear();

    return (
      <AppLayout>
        <AppSider
          id={ElementIdsEnum.SIDE_MENU}
          width={"256px"}
          collapsible={true}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          trigger={null}
        >
          <Logo isMobile={this.state.collapsed} isDarkBackground={true} />
          <AppMenu />
        </AppSider>
        <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
          <AppLayoutContent>
            {children || "Welcome to Lightbot!"}
          </AppLayoutContent>
          <Footer>
            © {year} • Lightbot is a registered trademark of{" "}
            <img className={imgStyle} src="/logo-icon-full.svg" /> Lightbase
            B.V. • Version -{" " + process.env.REACT_APP_VERSION}
          </Footer>
        </Layout>
      </AppLayout>
    );
  }

  private onCollapse = () =>
    this.setState({ collapsed: !this.state.collapsed });
}

export const LightbotLayout = compose(withRouter)(LightbotLayoutDisconnected);
