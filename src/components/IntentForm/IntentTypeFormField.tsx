import { Form, Radio } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { RadioChangeEvent } from "antd/lib/radio";
import * as React from "react";

export enum IntentTypeEnum {
  DEFAULT = "DEFAULT",
  FALLBACK = "FALLBACK",
  WELCOME = "WELCOME"
}

type IntentTypeProps = {
  value?: IntentTypeEnum;
  onChange?(value: IntentTypeEnum): void;
};

export class IntentType extends React.Component<IntentTypeProps> {
  public render() {
    const { value, onChange } = this.props;
    return (
      <Radio.Group value={value} onChange={this.onChange}>
        <Radio.Button value={IntentTypeEnum.DEFAULT}>Default</Radio.Button>
        <Radio.Button value={IntentTypeEnum.FALLBACK}>Fallback</Radio.Button>
        <Radio.Button value={IntentTypeEnum.WELCOME}>Welcome</Radio.Button>
      </Radio.Group>
    );
  }

  private onChange = ({ target: { value } }: RadioChangeEvent) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };
}

export type RenderIntentTypeProps = FormComponentProps & {
  itemKey: string;
  value?: IntentTypeEnum;
};

/**
 * This component should be called as a function and not as a JSX component
 * Otherwise, the form is not going to recognize this field and not throw erros
 */
export const renderIntentType = ({
  itemKey,
  form,
  value
}: RenderIntentTypeProps) =>
  form &&
  form.getFieldDecorator(`values[${itemKey}]`, {
    initialValue: value,
    rules: [
      {
        enum: [
          IntentTypeEnum.DEFAULT,
          IntentTypeEnum.FALLBACK,
          IntentTypeEnum.WELCOME
        ],
        required: true,
        type: "enum"
      }
    ],
    trigger: "onChange",
    validateTrigger: "onChange"
  })(<IntentType />);

type IntentTypeFormFieldProps = RenderIntentTypeProps;

export const IntentTypeFormField = (props: IntentTypeFormFieldProps) => (
  <Form.Item required={false}>{renderIntentType(props)}</Form.Item>
);
