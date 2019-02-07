import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { Button } from "src/components/Button";
import {
  FormHeadingContainer,
  FormItem,
  FormLogoWrapper,
  renderFormTextInput,
  FormActionLink,
} from "src/components/Form";
import { Logo } from "src/components/Logo";
import { FormId } from "src/constants/FormId";

import { ResetPasswordFormWrapper } from "./ResetPasswordWrapper";
import { Routing, RoutesKeysEnum } from "src/routing";

type ResetPasswordFormProps = FormComponentProps & {
  isSubmitting?: boolean;
  onSubmit(props: { email: string }): void;
};

class ResetPasswordFormDisconnected extends React.Component<ResetPasswordFormProps> {
  static formId: FormId = "forgot_password_form";

  static formFields = {
    email: "forgot_password_email_field",
  };

  public render() {
    const { form, isSubmitting } = this.props;
    return (
      <ResetPasswordFormWrapper>
        <FormLogoWrapper>
          <Logo />
        </FormLogoWrapper>
        <FormHeadingContainer>
          <h2>Reset you password</h2>
          <p>Enter your email and we’ll send you instructions on how to reset your password</p>
        </FormHeadingContainer>
        <Form id={ResetPasswordFormDisconnected.formId} onSubmit={this.onSubmit}>
          <FormItem>
            {renderFormTextInput({
              required: true,
              placeholder: "Email address",
              errorMessage: "Please provide a valid email address.",
              type: "email",
              size: "large",
              form,
              itemGroup: ResetPasswordFormDisconnected.formId,
              itemKey: ResetPasswordFormDisconnected.formFields.email,
            })}
          </FormItem>
          <FormItem>
            <Button htmlType="submit" size="large" block={true} loading={isSubmitting}>
              Reset password
            </Button>
          </FormItem>
        </Form>
        <FormActionLink to={Routing.routes[RoutesKeysEnum.LOGIN].routeProps.path}>
          Back to login
        </FormActionLink>
      </ResetPasswordFormWrapper>
    );
  }

  private onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { form, onSubmit } = this.props;

    form.validateFields((err, fields) => {
      if (!err) {
        const email =
          fields[ResetPasswordFormDisconnected.formId][
            ResetPasswordFormDisconnected.formFields.email
          ];

        onSubmit({ email });
      }
    });
  };
}

export const ResetPasswordForm = Form.create({})(ResetPasswordFormDisconnected);
