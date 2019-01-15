import { Icon } from "antd";
import * as React from "react";
import { css } from "react-emotion";
import theme from "~/config/theme.js";

type StyledIconProps = {
  isCollapsed: boolean;
};

const iconStyle = (props: StyledIconProps) => css`
  color: ${theme["default-border-color"]};
  transition: all 0.3s;
  transform: ${props.isCollapsed ? "rotateZ(0deg)" : "rotateZ(90deg)"};
`;

export type CollapseButtonProps = {
  isCollapsed: boolean;
};

export const CollapseButton = ({ isCollapsed }: CollapseButtonProps) => (
  <Icon type="caret-right" className={iconStyle({ isCollapsed })} />
);
