import { Badge, Icon, Menu } from "antd";
import * as React from "react";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";

const badgeStyle = css`
  margin-left: 10px;
`;

export type AppMenuItemProps = {
  itemKey: string;
  icon: string;
  label: string;
  badgeCount?: number;
  to?: string;
};

export const renderMenuItem = ({ itemKey, icon, label, badgeCount, to }: AppMenuItemProps) => (
  <Menu.Item key={itemKey}>
    <Link to={to || "#"}>
      <Icon type={icon} />
      <span>{label}</span>
      <Badge count={badgeCount} showZero={false} css={badgeStyle} />
    </Link>
  </Menu.Item>
);
