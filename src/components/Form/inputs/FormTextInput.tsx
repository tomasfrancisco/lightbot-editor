import { Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { InputProps } from "antd/lib/input";
import * as React from "react";
import { string } from "prop-types";

export type RenderFormTextInputProps = FormComponentProps & {
  placeholder?: string;
  size?: "small" | "large" | "default";
  required?: boolean;
  itemGroup?: string;
  itemKey: string;
  value?: any;
  errorMessage?: string;
  type?: string;
  inputType?: string;
  getValueFromEvent?(e): any;
  getValueProps?(value): any;
  validator?(rule: any, value: any, callback: any, source?: any, options?: any): any;
};

const getFieldValidatorKey = (itemKey: string, itemGroup?: string) => {
  if (itemGroup) {
    return `${itemGroup}[${itemKey}]`;
  } else {
    return itemKey;
  }
};

export const renderFormTextInput = ({
  required,
  itemGroup,
  itemKey,
  form,
  value,
  type,
  size,
  placeholder,
  errorMessage,
  getValueFromEvent,
  getValueProps,
  validator,
  inputType,
}: RenderFormTextInputProps) =>
  form &&
  form.getFieldDecorator(getFieldValidatorKey(itemKey, itemGroup), {
    getValueFromEvent,
    // @ts-ignore
    getValueProps,
    initialValue: value,
    rules: [
      {
        message: errorMessage,
        required: required || false,
        type,
        validator,
        whitespace: true,
      },
    ],
    validateTrigger: ["onChange", "onBlur"],
  })(<Input placeholder={placeholder} size={size} type={inputType} />);
