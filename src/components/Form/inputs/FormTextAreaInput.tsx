import { Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";

export type RenderFormTextAreaInputProps = FormComponentProps & {
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

export const renderFormTextAreaInput = ({
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
}: RenderFormTextAreaInputProps) =>
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
  })(
    <Input.TextArea
      placeholder={placeholder}
      autosize={{ minRows: 2, maxRows: 6 }}
    />
  );
