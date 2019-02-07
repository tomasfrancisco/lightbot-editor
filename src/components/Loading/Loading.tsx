import { Icon, Spin } from "antd";
import * as React from "react";
import { css } from "@emotion/core";

const wrapperStyle = css`
  text-align: center;
  padding: 30px 50px;
  margin: 20px 0;
`;

const fullPageStyle = css`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin={true} />;

type LoadingProps = {
  fullPage?: boolean;
};

export const Loading = ({ fullPage }: LoadingProps) => (
  <div css={[wrapperStyle, fullPage && fullPageStyle]}>
    <Spin />
  </div>
);
