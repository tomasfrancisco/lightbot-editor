import { Icon } from "antd";
import * as React from "react";
import { css } from "@emotion/core";
import theme from "src/config/theme.json";

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
  <Icon type="caret-right" css={iconStyle({ isCollapsed })} />
);
