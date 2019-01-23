import { Input } from "antd";
import { FormComponentProps, ValidationRule } from "antd/lib/form";
import * as React from "react";
import { css } from "react-emotion";

const inputStyle = css`
  width: calc(100% - 25px);
  margin-right: 8px;
`;

export type InputProps = FormComponentProps & {
  itemKey: string;
  value?: string;
  placeholder?: string;
  rules?: ValidationRule[];
};

/**
 * This component should be called as a function and not as a JSX component
 * Otherwise, the form is not going to recognize this field and not throw errors
 */
export const renderInput = ({ itemKey, form, value, placeholder, rules = [] }: InputProps) =>
  form &&
  form.getFieldDecorator(`values[${itemKey}]`, {
    initialValue: value,
    rules: [
      {
        message: "Please input a user expression or delete this field.",
        required: true,
        whitespace: true,
      },
      ...rules,
    ],
    validateFirst: true,
    validateTrigger: ["onChange", "onBlur"],
  })(<Input placeholder={placeholder} className={inputStyle} />);
