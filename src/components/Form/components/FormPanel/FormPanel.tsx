import { Collapse } from "antd";
import { rgba } from "polished";
import styled from "react-emotion";
import theme from "src/config/theme.json";

export const FormPanel = styled(Collapse.Panel)`
  background-color: transparent;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;

  &:not(:first-child) {
    margin-top: 10px;
  }

  &:last-child {
    border-radius: 5px !important;
    margin-bottom: 20px;
  }

  & > * {
    &:first-child {
      &:hover {
        background-color: ${rgba(theme["primary-color"], 0.1)};
      }
    }
  }
`;
