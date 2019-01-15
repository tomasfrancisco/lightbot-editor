import { Icon, Tooltip } from "antd";
import * as React from "react";
import styled from "react-emotion";
import theme from "~/config/theme.js";

const StyledIcon = styled(Icon)`
  right: 0;
  transition: all 0.3s;
  cursor: pointer;
  line-height: 2.5;
  height: 32px;
  margin-left: 10px;

  &:hover {
    color: ${theme["error-color"]};
  }
`;

type FormItemDeleteIconProps = {
  tooltipTitle?: string;
  onRemove?(): void;
};

export const FormItemDeleteIcon = ({
  onRemove,
  tooltipTitle
}: FormItemDeleteIconProps) =>
  onRemove ? (
    <Tooltip title={tooltipTitle}>
      <StyledIcon type="minus-circle-o" onClick={onRemove} />
    </Tooltip>
  ) : null;
