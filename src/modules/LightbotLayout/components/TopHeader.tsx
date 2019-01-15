import { Layout } from "antd";
import styled from "react-emotion";

const { Header } = Layout;

export const TopHeader = styled(Header)`
  position: fixed;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 0;
  background-color: #fff;
`;

export const TopHeaderLeft = styled("div")`
  display: flex;
  justify-content: flex-start;
`;

export const TopHeaderRight = styled("div")`
  display: flex;
  justify-content: flex-end;
`;
