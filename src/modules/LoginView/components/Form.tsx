import { Form as AntdForm, Icon, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { Button } from "src/components/Button";

export interface FormProps extends FormComponentProps {
  onSubmit: (token: string) => void;
}

export class FormDisconnected extends React.Component<FormProps> {
  private formKey: string;

  constructor(props) {
    super(props);

    this.formKey = "auth";

    const {
      form: { getFieldDecorator },
    } = props;

    getFieldDecorator(this.formKey, { initialValue: [] });
  }

  public render() {
    return (
      <AntdForm layout="vertical" onSubmit={this.onSubmit}>
        <AntdForm.Item required={false}>{this.renderTokenFormInput()}</AntdForm.Item>
        <AntdForm.Item>
          <Button type="primary" htmlType="submit" block={true}>
            Unlock Editor
          </Button>
        </AntdForm.Item>
      </AntdForm>
    );
  }

  public renderTokenFormInput() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return getFieldDecorator("values.token", {
      rules: [
        {
          message: "Please provide an access token.",
          required: true,
          whitespace: true,
        },
      ],
      validateTrigger: ["onChange", "onBlur"],
    })(
      <Input
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Access token"
        style={{ width: "250px" }}
      />,
    );
  }

  private onSubmit = event => {
    event.preventDefault();

    const { form, onSubmit } = this.props;

    form.validateFields((err, fields) => {
      if (!err) {
        onSubmit(fields.values.token);
      }
    });
  };
}

export const Form = AntdForm.create()(FormDisconnected);
