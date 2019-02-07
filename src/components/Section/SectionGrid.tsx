import { Layout } from "antd";
import styled from "@emotion/styled";

export const SectionGrid = styled(Layout)`
  position: relative;
  display: flex;
  margin: 16px 0px;
  height: calc(100vh - 40px - 16px);
  min-height: 360px;
  justify-content: space-around;
`;

export const SectionGridHorizontalSeparator = styled("div")`
  position: relative;
  height: 15px;
`;
