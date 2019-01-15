import { Row } from "antd";
import { RowProps } from "antd/lib/row";
import * as React from "react";
import { css, cx } from "react-emotion";

const rowStyle = css`
  display: flex;
  width: 100%;
`;

export const FormRow = ({ className, ...props }: RowProps) => (
  <Row className={cx(rowStyle, className)} {...props}>
    {props.children}
  </Row>
);
