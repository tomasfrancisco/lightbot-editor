import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { Button } from "src/components/Button";
import {
  FormHeadingContainer,
  FormItem,
  FormLogoWrapper,
  renderFormTextInput,
} from "src/components/Form";
import { Logo } from "src/components/Logo";
import { FormId } from "src/constants/FormId";

import { ChangePasswordFormWrapper } from "./ChangePasswordWrapper";

type ChangePasswordFormProps = FormComponentProps & {
  isSubmitting?: boolean;
  onSubmit(props: { password: string }): void;
};

type ChangePasswordFormState = {
  verifyPasswordHasFeedback: boolean;
  verifyPasswordIsSuccess: boolean;
};

class ChangePasswordFormDisconnected extends React.Component<
  ChangePasswordFormProps,
  ChangePasswordFormState
> {
  static formId: FormId = "change_password_form";

  static formFields = {
    password: "change_password_password_field",
    verifyPassword: "change_password_verify_password_field",
  };

  state: ChangePasswordFormState = {
    verifyPasswordHasFeedback: false,
    verifyPasswordIsSuccess: false,
  };

  public render() {
    const { form, isSubmitting } = this.props;
    const { verifyPasswordIsSuccess, verifyPasswordHasFeedback } = this.state;

    return (
      <ChangePasswordFormWrapper>
        <FormLogoWrapper>
          <Logo />
        </FormLogoWrapper>
        <FormHeadingContainer>
          <h2>Please provide a password to your account.</h2>
        </FormHeadingContainer>
        <Form id={ChangePasswordFormDisconnected.formId} onSubmit={this.onSubmit}>
          <FormItem>
            {renderFormTextInput({
              required: true,
              placeholder: "Password",
              errorMessage: "Please provide a valid password.",
              type: "string",
              size: "large",
              inputType: "password",
              form,
              itemGroup: ChangePasswordFormDisconnected.formId,
              itemKey: ChangePasswordFormDisconnected.formFields.password,
            })}
          </FormItem>
          <FormItem
            hasFeedback={verifyPasswordHasFeedback}
            validateStatus={
              verifyPasswordHasFeedback ? (verifyPasswordIsSuccess ? "success" : "error") : ""
            }
          >
            {renderFormTextInput({
              required: true,
              placeholder: "Verify password",
              errorMessage: "Passwords don't match",
              type: "string",
              size: "large",
              inputType: "password",
              form,
              itemGroup: ChangePasswordFormDisconnected.formId,
              itemKey: ChangePasswordFormDisconnected.formFields.verifyPassword,
              validator: this.verifyPassword,
            })}
          </FormItem>
          <FormItem>
            <Button htmlType="submit" size="large" block={true} loading={isSubmitting}>
              Confirm
            </Button>
          </FormItem>
        </Form>
      </ChangePasswordFormWrapper>
    );
  }

  private verifyPassword = (rule, value, callback) => {
    const { form } = this.props;
    let verifyPasswordIsSuccess = false;
    let verifyPasswordHasFeedback = false;

    const masterPassword = form.getFieldValue(
      `${ChangePasswordFormDisconnected.formId}[${
        ChangePasswordFormDisconnected.formFields.password
      }]`,
    );

    verifyPasswordHasFeedback = true;
    if (!value || value === "") {
      callback();
      return;
    }

    if (value === masterPassword) {
      verifyPasswordIsSuccess = true;
      callback();
    } else {
      callback(false);
    }

    this.setState({ verifyPasswordHasFeedback, verifyPasswordIsSuccess });
  };

  private onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { form, onSubmit } = this.props;

    form.validateFields((err, fields) => {
      if (!err) {
        const password =
          fields[ChangePasswordFormDisconnected.formId][
            ChangePasswordFormDisconnected.formFields.password
          ];
        const verifyPassword =
          fields[ChangePasswordFormDisconnected.formId][
            ChangePasswordFormDisconnected.formFields.verifyPassword
          ];

        if (password === verifyPassword) {
          onSubmit({ password });
        }
      }
    });
  };
}

export const ChangePasswordForm = Form.create({})(ChangePasswordFormDisconnected);
