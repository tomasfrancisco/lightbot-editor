import { Divider, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { Button } from "src/components/Button";
import {
  FormActionLink,
  FormHeadingContainer,
  FormItem,
  FormLogoWrapper,
} from "src/components/Form";
import { inlineFormActionLinkStyle } from "src/components/Form/components";
import { renderFormTextInput } from "src/components/Form/inputs";
import { Logo } from "src/components/Logo";
import { FormId } from "src/constants/FormId";

import { SignupFormWrapper } from "./SignupFormWrapper";
import { Routing, RoutesKeysEnum } from "src/routing";

type SignupFormProps = FormComponentProps & {
  isSubmitting?: boolean;
  onSubmit(props: { email: string }): void;
};

type SignupFormState = {};

class SignupFormDisconnected extends React.Component<SignupFormProps, SignupFormState> {
  static formId: FormId = "signup_form";

  static formFields = {
    email: "signup_email_field",
    password: "signup_password_field",
  };

  public render() {
    const { form, isSubmitting } = this.props;
    return (
      <SignupFormWrapper>
        <FormLogoWrapper>
          <Logo />
        </FormLogoWrapper>
        <FormHeadingContainer>
          <h2>Start building your bot for free</h2>
          <p>
            A subscription is required for launching your bot. All accounts start on a free plan and
            we’ll only charge when you upgrade your account and launch your bot.{" "}
            <a
              css={inlineFormActionLinkStyle}
              href="https://lightbot.io/pricing.html"
              target="__blank"
            >
              Learn more about pricing
            </a>
          </p>
        </FormHeadingContainer>
        <Button level="default" size="large" icon="google" block={true}>
          Sign in with Google
        </Button>
        <Divider>or</Divider>
        <Form onSubmit={this.onSubmit}>
          <FormItem>
            {renderFormTextInput({
              required: true,
              placeholder: "Email address",
              errorMessage: "Please provide a valid email address.",
              type: "email",
              size: "large",
              form,
              itemGroup: SignupFormDisconnected.formId,
              itemKey: SignupFormDisconnected.formFields.email,
            })}
          </FormItem>
          <FormItem>
            <Button htmlType="submit" size="large" block={true} loading={isSubmitting}>
              Create account
            </Button>
          </FormItem>
        </Form>
        <FormActionLink to={Routing.routes[RoutesKeysEnum.LOGIN].routeProps.path}>
          I already have an account, go to login
        </FormActionLink>
      </SignupFormWrapper>
    );
  }

  private onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { form, onSubmit } = this.props;

    form.validateFields((err, fields) => {
      if (!err) {
        const email =
          fields[SignupFormDisconnected.formId][SignupFormDisconnected.formFields.email];

        onSubmit({ email });
      }
    });
  };
}

export const SignupForm = Form.create<SignupFormProps>({})(SignupFormDisconnected);
