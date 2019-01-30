import { Input, Row } from "antd";
import { FormComponentProps, ValidationRule } from "antd/lib/form";
import * as React from "react";
import Img from "react-image";
import { FormItem } from "src/components/Form/components/FormItem";
import { formInputImageStyle, ImageRow, InputImageContainer } from "src/components/Form/layout";

export type FormImageInputProps = FormComponentProps & {
  required?: boolean;
  title?: string;
  itemGroup?: string;
  itemKey: string;
  rules?: ValidationRule[];
  initialValue: string;
  placeholder?: string;
};

export type FormImageInputState = {
  src: string;
};

export class FormImageInput extends React.Component<FormImageInputProps, FormImageInputState> {
  constructor(props: FormImageInputProps) {
    super(props);

    this.state = {
      src: props.initialValue,
    };
  }

  public render() {
    const { form, initialValue, rules, placeholder, title, required } = this.props;
    const { src } = this.state;
    const remainRules = rules ? rules : [];

    if (form) {
      return (
        <FormItem title={title}>
          <Row>
            {form.getFieldDecorator(this.fieldDecoratorId, {
              initialValue,
              rules: [
                {
                  message: "Please insert some value",
                  required: required ? true : false,
                  whitespace: true,
                },
                ...remainRules,
              ],
              validateFirst: true,
              validateTrigger: ["onChange", "onBlur"],
            })(<Input placeholder={placeholder} onChange={this.onInputChange} />)}
          </Row>
          <ImageRow>
            <InputImageContainer>
              <Img className={formInputImageStyle} src={src} />
            </InputImageContainer>
          </ImageRow>
        </FormItem>
      );
    } else {
      return null;
    }
  }

  private get fieldDecoratorId() {
    const { itemKey, itemGroup } = this.props;

    if (itemGroup) {
      return `${itemGroup}[${itemKey}]`;
    } else {
      return itemKey;
    }
  }

  private onInputChange = e => {
    this.setState({ src: e.target.value });
  };
}
