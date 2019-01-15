import { Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";

export type RenderFormTextInputProps = FormComponentProps & {
  required?: boolean;
  itemGroup?: string;
  itemKey: string;
  value?: any;
  placeholder?: string;
  errorMessage?: string;
  type?: string;
  getValueFromEvent?(e): any;
  getValueProps?(value): any;
  validator?(
    rule: any,
    value: any,
    callback: any,
    source?: any,
    options?: any
  ): any;
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
  placeholder,
  errorMessage,
  getValueFromEvent,
  getValueProps,
  validator
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
        whitespace: true
      }
    ],
    validateTrigger: ["onChange", "onBlur"]
  })(<Input placeholder={placeholder} />);
