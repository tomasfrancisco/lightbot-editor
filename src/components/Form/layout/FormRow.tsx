import { Row } from "antd";
import { RowProps } from "antd/lib/row";
import * as React from "react";
import { css } from "@emotion/core";

const rowStyle = css`
  display: flex;
  width: 100%;
`;

export const FormRow = ({ className, ...props }: RowProps) => (
  <Row css={[rowStyle, className]} {...props}>
    {props.children}
  </Row>
);
