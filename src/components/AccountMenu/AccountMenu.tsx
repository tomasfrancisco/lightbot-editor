import { StorageConstantsEnum, StorageInstance } from "@lightbot/browser-storage";
import { Icon, message } from "antd";
import * as React from "react";
import { Redirect } from "react-router";

export type AccountMenuProps = {
  onLogout(): void;
};
export type AccountMenuState = {
  isAuthenticated: boolean;
};

export class AccountMenu extends React.Component<AccountMenuProps, AccountMenuState> {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: !!StorageInstance.getItem(StorageConstantsEnum.EDITOR_TOKEN_ID),
    };
  }

  public render() {
    const { isAuthenticated } = this.state;

    if (!isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div onClick={this.logout}>
        <Icon type={"logout"} />
        <span>Logout</span>
      </div>
    );
  }

  private logout = () => {
    const { onLogout } = this.props;
    StorageInstance.removeItem(StorageConstantsEnum.EDITOR_TOKEN_ID);
    this.setState({ isAuthenticated: false });
    onLogout();
    message.success("Logged out successfully!");
  };
}
