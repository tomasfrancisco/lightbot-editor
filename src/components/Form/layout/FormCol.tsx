import { Col } from "antd";
import { ColProps } from "antd/lib/col";
import * as React from "react";
import { css } from "react-emotion";

const colStyle = css`
  float: none;
  display: inline-block;

  &:not(:first-of-type):not(:last-of-type) {
    padding: 0 2px;
  }

  &:first-of-type {
    padding-right: 4px;
  }

  &:last-of-type {
    padding-left: 4px;
  }
`;

export const FormCol = (props: ColProps) => (
  <Col className={colStyle} {...props}>
    {props.children}
  </Col>
);
