import { Form as AntdForm } from "antd";
import { FormProps as AntdFormProps } from "antd/lib/form";
import * as React from "react";
import { css } from "react-emotion";

const formStyle = css`
  min-width: 314px;
  margin-left: 16px;
  margin-top: 10px;
`;

export type FormProps = AntdFormProps & {};

export const Form = (props: FormProps) => {
  return <AntdForm className={formStyle} {...props} />;
};
