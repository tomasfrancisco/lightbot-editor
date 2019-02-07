import * as React from "react";
import { AppBackground } from "src/components/AppBackground";
import { ResetPasswordForm } from "src/components/Forms/ForgotPasswordForm/ResetPasswordForm";
import { PaperSheet } from "src/components/PaperSheet";
import { api } from "src/api";
import { message } from "antd";
import { noteStyle } from "src/components/Message/message.styles";

type ResetPasswordViewProps = {};
type ResetPasswordViewState = {
  isSubmitting: boolean;
};

export class ResetPasswordView extends React.Component<
  ResetPasswordViewProps,
  ResetPasswordViewState
> {
  state: ResetPasswordViewState = {
    isSubmitting: false,
  };

  public render() {
    const { isSubmitting } = this.state;
    return (
      <AppBackground>
        <PaperSheet>
          <ResetPasswordForm onSubmit={this.onResetPassword} isSubmitting={isSubmitting} />
        </PaperSheet>
      </AppBackground>
    );
  }

  private onResetPassword = async ({ email }: { email: string }) => {
    this.isSubmitting = true;

    await api.resetPassword({ email });
    message.info(
      <>
        📨 We've sent an email to your inbox.
        <p css={noteStyle}>
          Be aware we only send an email in case your are on our database.
          <br />
          Please contact us in case you believe there's an issue.
        </p>
      </>,
      10,
    );

    this.isSubmitting = false;
  };

  private set isSubmitting(isSubmitting: boolean) {
    setTimeout(() => this.setState({ isSubmitting }), isSubmitting ? 0 : 1000);
  }
}
