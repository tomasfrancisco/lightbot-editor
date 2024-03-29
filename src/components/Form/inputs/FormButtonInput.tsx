import { Input, Select } from "antd";
import { css } from "@emotion/core";
import _clone from "lodash.clone";
import * as React from "react";
import { FormCol, FormRow } from "src/components/Form/layout";
import { Intent } from "src/models";

const selectStyle = css`
  width: 300px;
  margin-right: 5px;
`;

export type FormButton = {
  label: string;
  intentId: number;
};

type FormButtonInputProps = {
  intents?: Intent[];
  value: FormButton;
  onChange(value: FormButton): void;
};

export class FormButtonInput extends React.Component<FormButtonInputProps> {
  public render() {
    const { value } = this.props;

    if (!value) {
      return null;
    }

    return (
      <FormRow>
        <FormCol span={12}>
          <Input
            placeholder="Button title"
            value={value.label}
            onChange={this.getOnChange("label")}
          />
        </FormCol>
        <FormCol span={12}>
          <Select
            placeholder="Jump to intent"
            defaultValue={value.intentId !== -1 ? value.intentId : undefined}
            onChange={this.onChangeIntentSelector("intentId")}
            allowClear={false}
            css={selectStyle}
          >
            {this.renderSelectOptions}
          </Select>
        </FormCol>
      </FormRow>
    );
  }

  private get renderSelectOptions() {
    const { intents } = this.props;
    if (!intents) {
      return null;
    }

    return intents.map(intent => {
      return (
        <Select.Option value={intent.id} key={"selectIntent--" + intent.id}>
          {intent.name}
        </Select.Option>
      );
    });
  }

  private onChangeIntentSelector = buttonProp => selectedIntentId => {
    const { onChange } = this.props;

    const propsValue = _clone(this.props.value);
    propsValue[buttonProp] = selectedIntentId;

    if (onChange) {
      onChange(propsValue);
    }
  };

  private getOnChange = buttonProp => ({ target: { value } }) => {
    const { onChange } = this.props;

    const propsValue = _clone(this.props.value);
    propsValue[buttonProp] = value;

    if (onChange) {
      onChange(propsValue);
    }
  };
}
