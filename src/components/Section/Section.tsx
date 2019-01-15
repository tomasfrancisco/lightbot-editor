import { Layout } from "antd";
import styled from "react-emotion";

export const Section = styled(Layout)`
  position: relative;
  display: flex;
  margin: 16px 0px;
  background-color: white;
  height: calc(100vh - 40px - 16px);
  min-height: 360px;
  border: 1px solid white;
  border-radius: 2px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
`;
