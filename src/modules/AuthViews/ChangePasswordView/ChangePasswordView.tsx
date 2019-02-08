import { message } from "antd";
import * as React from "react";
import { compose } from "react-apollo";
import { RouteComponentProps, withRouter } from "react-router";
import { api } from "src/api";
import { AppBackground } from "src/components/AppBackground";
import { ChangePasswordForm } from "src/components/Forms";
import { PaperSheet } from "src/components/PaperSheet";
import { RoutesKeysEnum, Routing } from "src/routing";
import { authenticationHelper } from "src/utils/authenticationHelper";

type ChangePasswordViewProps = RouteComponentProps & {};
type ChangePasswordViewState = {
  isSubmitting: boolean;
};

class ChangePasswordViewDisconnected extends React.Component<
  ChangePasswordViewProps,
  ChangePasswordViewState
> {
  private token: string;

  state: ChangePasswordViewState = {
    isSubmitting: false,
  };

  constructor(props: ChangePasswordViewProps) {
    super(props);

    if (!authenticationHelper.verifyToken) {
      props.history.replace({
        pathname: Routing.routes[RoutesKeysEnum.LOGIN].routeProps.path,
      });
    }

    this.token = authenticationHelper.verifyToken as string;
    authenticationHelper.verifyToken = null;
  }

  public render() {
    const { isSubmitting } = this.state;

    return (
      <AppBackground>
        <PaperSheet>
          <ChangePasswordForm onSubmit={this.onChangePassword} isSubmitting={isSubmitting} />
        </PaperSheet>
      </AppBackground>
    );
  }

  private onChangePassword = async ({ password }: { password: string }) => {
    this.isSubmitting = true;

    const {
      location: { search },
    } = this.props;

    const isChangePasswordSuccessful = await api.changePassword({
      password,
      token: this.token,
    });

    if (isChangePasswordSuccessful) {
      message.success("🔑 You can now login with your new password.");
    } else {
      message.error("😞 Something went wrong.");
    }

    this.isSubmitting = false;

    this.props.history.replace({
      pathname: Routing.routes[RoutesKeysEnum.LOGIN].routeProps.path,
    });
  };

  private set isSubmitting(isSubmitting: boolean) {
    setTimeout(() => this.setState({ isSubmitting }), isSubmitting ? 0 : 1000);
  }
}

export const ChangePasswordView = compose(withRouter)(ChangePasswordViewDisconnected);
