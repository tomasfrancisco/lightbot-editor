import { Layout } from "antd";
import * as React from "react";
import { compose } from "react-apollo";

const { Header } = Layout;

export type HandOffViewProps = {};

export class HandOffViewDisconnected extends React.Component<HandOffViewProps> {
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
          HandOff
        </Header>
      </Layout>
    );
  }
}

export const HandOffView = compose()(HandOffViewDisconnected);
