import { Divider, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { Button } from "src/components/Button";
import {
  FormActionLink,
  FormHeadingContainer,
  FormItem,
  FormLogoWrapper,
  renderFormTextInput,
} from "src/components/Form";
import { Logo } from "src/components/Logo";
import { FormId } from "src/constants/FormId";

import { LoginFormWrapper } from "./LoginFormWrapper";
import { Routing, RoutesKeysEnum } from "src/routing";

type LoginFormProps = FormComponentProps & {
  isSubmitting?: boolean;
  isGoogleRedirecting?: boolean;
  onSubmit(props: { email: string; password: string }): void;
  onGoogleSignup(): void;
};

type LoginFormState = {};

class LoginFormDisconnected extends React.Component<LoginFormProps, LoginFormState> {
  static formId: FormId = "login_form";
  static emailFormId: FormId = "login_email_form_field";
  static passwordFormId: FormId = "login_password_form_field";

  public render() {
    const { form, isSubmitting, onGoogleSignup, isGoogleRedirecting } = this.props;
    return (
      <LoginFormWrapper>
        <FormLogoWrapper>
          <Logo />
        </FormLogoWrapper>
        <FormHeadingContainer>
          <h2>Login to your Lightbot account</h2>
        </FormHeadingContainer>
        <Button
          htmlType="button"
          level="default"
          size="large"
          icon="google"
          block={true}
          onClick={onGoogleSignup}
          loading={isGoogleRedirecting}
        >
          Sign in with Google
        </Button>
        <Divider>or</Divider>
        <Form id={LoginFormDisconnected.formId} onSubmit={this.onSubmit}>
          <FormItem>
            {renderFormTextInput({
              required: true,
              placeholder: "Email address",
              errorMessage: "Please provide a valid email address.",
              type: "email",
              size: "large",
              form,
              itemGroup: LoginFormDisconnected.formId,
              itemKey: LoginFormDisconnected.emailFormId,
            })}
          </FormItem>
          <FormItem>
            {renderFormTextInput({
              required: true,
              placeholder: "Password",
              errorMessage: "Please provide a valid password.",
              type: "string",
              size: "large",
              inputType: "password",
              form,
              itemGroup: LoginFormDisconnected.formId,
              itemKey: LoginFormDisconnected.passwordFormId,
            })}
          </FormItem>
          <FormItem>
            <Button htmlType="submit" size="large" block={true} loading={isSubmitting}>
              {isSubmitting ? "Logging in" : "Login"}
            </Button>
          </FormItem>
        </Form>
        <FormActionLink to={Routing.routes[RoutesKeysEnum.RESET_PASSWORD].routeProps.path}>
          I forgot my password
        </FormActionLink>
        <FormActionLink to={Routing.routes[RoutesKeysEnum.SIGNUP].routeProps.path}>
          I don’t have an account yet, go to signup
        </FormActionLink>
      </LoginFormWrapper>
    );
  }

  private onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { onSubmit, form } = this.props;

    form.validateFields((err, fields) => {
      if (!err) {
        const email: string =
          fields[LoginFormDisconnected.formId][LoginFormDisconnected.emailFormId];
        const password: string =
          fields[LoginFormDisconnected.formId][LoginFormDisconnected.passwordFormId];
        onSubmit({ email, password });
      }
    });
  };
}

export const LoginForm = Form.create<LoginFormProps>({})(LoginFormDisconnected);
