import { Layout } from "antd";
import * as React from "react";
import { compose } from "react-apollo";

const { Header } = Layout;

export type WidgetViewProps = {};

export class WidgetViewDisconnected extends React.Component<WidgetViewProps> {
  public render() {
    return (
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
          Widget
        </Header>
      </Layout>
    );
  }
}

export const WidgetView = compose()(WidgetViewDisconnected);
