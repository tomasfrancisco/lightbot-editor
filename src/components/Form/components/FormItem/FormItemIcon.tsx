import { Icon } from "antd";
import { IconProps } from "antd/lib/icon";
import * as React from "react";
import styled from "react-emotion";
import theme from "src/config/theme.json";

type FormItemIconProps = Partial<IconProps> & {
  hidden?: boolean;
};

const StyledIcon = styled(Icon)`
  color: ${theme["default-inactive-color"]};
  margin-right: 8px;
  line-height: 2.5;
  height: 32px;

  &.transparent {
    visibility: hidden;
  }

  &.hidden {
    display: none;
  }
`;

export const FormItemIcon = ({ type, hidden, ...props }: FormItemIconProps) => (
  <StyledIcon
    type={type || "ellipsis"}
    className={!type ? "transparent" : hidden ? "hidden" : ""}
    {...props}
  />
);
