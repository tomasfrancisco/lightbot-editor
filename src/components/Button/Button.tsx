import { Button as AntdButton } from "antd";
import { ButtonProps as AntdButtonProps } from "antd/lib/button";
import { rgba } from "polished";
import * as React from "react";
import styled, { css } from "react-emotion";
import theme from "~/config/theme.js";

export type ButtonColorTypes = "primary" | "success" | "info" | "secondary";

const getThemeColor = (type: ButtonColorTypes, prop?: string) =>
  theme[`${type}-${prop ? `${prop}-` : ""}color`];

export const getButtonStyle = ({ level }: ButtonProps) => css`
  background-color: ${getThemeColor(level || "primary")};
  color: ${getThemeColor(level || "primary", "text")};
  border-color: ${getThemeColor(level || "primary", "border")};

  &:hover {
    color: ${getThemeColor(level || "primary", "text")};
    background-color: ${getThemeColor(level || "primary")};
    border-color: ${getThemeColor(level || "primary", "border")};
    box-shadow: 0 3px 9px 2px ${rgba(getThemeColor(level || "primary"), 0.45)};
    transform: translate(0, -2px);
  }

  &:active {
    box-shadow: inset 0 0 8px 0 rgba(0, 0, 0, 0.25);
  }

  &:focus {
    background-color: ${getThemeColor(level || "primary")};
    color: ${getThemeColor(level || "primary", "text")};
    border-color: ${getThemeColor(level || "primary", "border")};
  }
`;

type ButtonProps = AntdButtonProps & {
  level?: ButtonColorTypes;
};

export const Button = ({ level, ...props }: ButtonProps) => (
  <AntdButton {...props} className={getButtonStyle({ level })} />
);
