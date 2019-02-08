import { message } from "antd";
import * as React from "react";
import { compose, withApollo, WithApolloClient } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { api } from "src/api";
import { AppBackground } from "src/components/AppBackground";
import { formActionLinkStyle } from "src/components/Form";
import { LoginForm } from "src/components/Forms";
import { PaperSheet } from "src/components/PaperSheet";
import { RoutesKeysEnum, Routing } from "src/routing";
import { authenticationHelper } from "src/utils/authenticationHelper";

export type LoginViewProps = RouteComponentProps & {};

type LoginViewState = {
  isSubmitting: boolean;
  isGoogleRedirecting: boolean;
};

class LoginViewDisconnected extends React.Component<LoginViewProps, LoginViewState> {
  state: LoginViewState = {
    isSubmitting: false,
    isGoogleRedirecting: false,
  };

  public render() {
    const { isSubmitting, isGoogleRedirecting } = this.state;

    return (
      <AppBackground>
        <PaperSheet>
          <LoginForm
            onSubmit={this.onLogin}
            isSubmitting={isSubmitting}
            onGoogleSignup={this.onGoogleSignup}
            isGoogleRedirecting={isGoogleRedirecting}
          />
        </PaperSheet>
      </AppBackground>
    );
  }

  private onGoogleSignup = async () => {
    setTimeout(() => this.setState({ isGoogleRedirecting: true }), 0);
    window.location.href = api.googleSignupURL;
  };

  private onLogin = async ({ email, password }: { email: string; password: string }) => {
    this.isSubmitting = true;

    const isLoginSuccessful = await api.login({ email, password });

    if (isLoginSuccessful) {
      this.loginAndRedirect();

      message.success("Future is now unlocked! To infinity... and beyond! 🚀");
    } else {
      message.error(
        <>
          The provided email and password combination were not found on our database.
          <a
            css={formActionLinkStyle}
            href={Routing.routes[RoutesKeysEnum.RESET_PASSWORD].routeProps.path}
          >
            Forgot your password?
          </a>
        </>,
      );
    }

    this.isSubmitting = false;
  };

  private loginAndRedirect = () => {
    const { history } = this.props;

    authenticationHelper.isAuthenticated = true;
    history.push(Routing.routes[RoutesKeysEnum.DASHBOARD].routeProps.path);
  };

  private set isSubmitting(isSubmitting: boolean) {
    setTimeout(() => this.setState({ isSubmitting }), isSubmitting ? 0 : 1000);
  }
}

export const LoginView = compose(withRouter)(LoginViewDisconnected);
