import { Layout } from "antd";
import styled from "@emotion/styled";

export const AppLayout = styled(Layout)`
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export const AppLayoutContent = styled(Layout.Content)`
  margin: 0 16px;
  max-height: calc(100vh - 40px);
`;
