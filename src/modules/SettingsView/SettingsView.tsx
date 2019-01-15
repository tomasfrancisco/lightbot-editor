import { Layout } from "antd";
import * as React from "react";
import { compose } from "react-apollo";

import { LightbotLayout } from "../LightbotLayout";

const { Header } = Layout;

export type SettingsViewProps = {};

export class SettingsViewDisconnected extends React.Component<SettingsViewProps> {
  public render() {
    return (
      <LightbotLayout>
        <Layout
          style={{
            margin: "16px 0",
            padding: 24,
            background: "#fff",
            minHeight: 360,
          }}
        >
          <Header
            style={{
              alignItems: "center",
              color: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Settings
          </Header>
        </Layout>
      </LightbotLayout>
    );
  }
}

export const SettingsView = compose()(SettingsViewDisconnected);
