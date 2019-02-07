import * as React from "react";
import { SignupForm } from "src/components/Forms";
import { AppBackground } from "src/components/AppBackground";
import { PaperSheet } from "src/components/PaperSheet";
import { Row, Col, message } from "antd";
import { fullWidthRow } from "./signupStyles";
import { api } from "src/api";
import { noteStyle } from "src/components/Message/message.styles";

type SignupViewProps = {};
type SignupViewState = {
  isSubmitting: boolean;
};

export class SignupView extends React.Component<SignupViewProps, SignupViewState> {
  state: SignupViewState = {
    isSubmitting: false,
  };

  public render() {
    const { isSubmitting } = this.state;
    return (
      <AppBackground>
        <PaperSheet>
          <Row css={fullWidthRow}>
            <Col span={12}>
              <SignupForm onSubmit={this.onSignup} isSubmitting={isSubmitting} />
            </Col>
            <Col span={12} />
          </Row>
        </PaperSheet>
      </AppBackground>
    );
  }

  private onSignup = async ({ email }: { email: string }) => {
    this.isSubmitting = true;
    const isSignupSuccessful = await api.signup({ email });

    if (isSignupSuccessful) {
      message.success("📨 Please check your email inbox to complete your registration!");
    } else {
      message.error(
        <>
          😔 Something went wrong. Please try again later.
          <p css={noteStyle}>Please contact us in case you believe there's an issue.</p>
        </>,
        10,
      );
    }

    this.isSubmitting = false;
  };

  private set isSubmitting(isSubmitting: boolean) {
    setTimeout(() => this.setState({ isSubmitting }), isSubmitting ? 0 : 1000);
  }
}
