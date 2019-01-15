import { Icon } from "antd";
import _clone from "lodash.clone";
import * as React from "react";
import styled from "react-emotion";
import { Button } from "~/components/Button";
import { FormItem } from "~/components/Form/components";
import { FormButton, FormButtonInput } from "~/components/Form/inputs/FormButtonInput";
import { FormRow } from "~/components/Form/layout";
import theme from "~/config/theme.js";
import { Intent } from "~/models";

const Wrapper = styled("div")`
  border: 1px dashed ${theme["default-border-color"]};
  border-radius: 5px;
  padding: 5px;
`;

type FormButtonsGroupButtonsProps = {
  intents?: Intent[];
  value?: FormButton[];
  onChange?(value: FormButton[]): void;
};

export class FormButtonsGroupButtons extends React.Component<FormButtonsGroupButtonsProps> {
  public render() {
    const { intents, value } = this.props;

    if (!value) {
      return null;
    }

    return (
      <Wrapper>
        {value.map((button, index) => (
          <FormItem key={index} onRemove={this.getOnRemoveHandler(index)}>
            <FormButtonInput
              intents={intents}
              key={index}
              onChange={this.getOnChangeHandler(index)}
              value={button}
            />
          </FormItem>
        ))}
        <FormRow>
          <Button onClick={this.onAdd} level="secondary" block={true}>
            <Icon type="right-square-o" />
            Add intent jump
          </Button>
        </FormRow>
      </Wrapper>
    );
  }

  private getOnChangeHandler = index => value => {
    const { onChange } = this.props;

    const propsValue = _clone(this.props.value) || [];

    propsValue[index] = value;

    if (onChange) {
      onChange(propsValue);
    }
  };

  private getOnRemoveHandler = index => () => {
    const { onChange } = this.props;

    const propsValue = _clone(this.props.value) || [];
    const newValue = [...propsValue.slice(0, index), ...propsValue.slice(index + 1)];

    if (onChange) {
      onChange(newValue);
    }
  };

  private onAdd = () => {
    const { onChange } = this.props;

    const propsValue = _clone(this.props.value) || [];

    propsValue.push({
      intentId: "",
      label: "",
    });

    if (onChange) {
      onChange(propsValue);
    }
  };
}
