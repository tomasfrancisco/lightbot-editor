import { Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import _clone from "lodash.clone";
import _get from "lodash.get";
import * as React from "react";
import { FormCol, FormRow } from "~/components/Form/layout";

export type FormLink = {
  label: string;
  link: string;
};

type FormLinkInputProps = {
  value?: FormLink;
  onChange?(value: FormLink): void;
};

class FormLinkInput extends React.Component<FormLinkInputProps> {
  public render() {
    const { value } = this.props;

    return (
      <FormRow>
        <FormCol span={12}>
          <Input
            placeholder="Label"
            value={_get(value, "label", "")}
            onChange={this.getOnChange("label")}
          />
        </FormCol>
        <FormCol span={12}>
          <Input
            placeholder="https://example.com"
            value={_get(value, "link", "")}
            onChange={this.getOnChange("link")}
          />
        </FormCol>
      </FormRow>
    );
  }

  private getOnChange = linkProp => ({ target: { value } }) => {
    const { onChange } = this.props;
    if (!onChange) {
      return;
    }

    const propsValue = _clone(this.props.value) || {
      label: "",
      link: ""
    };

    propsValue[linkProp] = value;

    if (onChange) {
      onChange(propsValue);
    }
  };
}

export type RenderFormLinkInputProps = FormComponentProps & {
  itemKey: string;
  value?: any;
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

export const renderFormLinkInput = ({
  itemKey,
  form,
  value,
  errorMessage,
  validator,
  getValueFromEvent,
  getValueProps,
  type
}: RenderFormLinkInputProps) =>
  form &&
  form.getFieldDecorator(itemKey, {
    getValueFromEvent,
    // @ts-ignore
    getValueProps,
    initialValue: value,
    rules: [
      {
        message: errorMessage || "Provide a label and a valid URL.",
        required: true,
        type,
        validator
      }
    ],
    validateTrigger: ["onChange", "onBlur"]
  })(<FormLinkInput />);
