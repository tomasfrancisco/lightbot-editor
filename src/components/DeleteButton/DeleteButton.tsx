import { Button as AntdButton, Dropdown, Icon, Menu, Popconfirm } from "antd";
import * as React from "react";
import styled, { css } from "react-emotion";
import { DeleteActionEnum } from "~/components/DeleteButton";
import theme from "~/config/theme.js";

const WarningIcon = styled(Icon)`
  color: ${theme["error-color"]} !important;
`;

const deleteButtonStyle = css`
  color: ${theme["error-color"]};

  &:hover,
  &:active,
  &:focus {
    color: ${theme["error-color"]};
    border-color: ${theme["error-color"]};
  }
`;

const deleteDropdownButtonStyle = css`
  & > button {
    color: ${theme["error-color"]};

    &:hover,
    &:active,
    &:focus {
      color: ${theme["error-color"]};
      border-color: ${theme["error-color"]};
    }
  }
`;

export type DeleteAction = {
  key: DeleteActionEnum;
  optionTitle?: string;
  confirmationMessage: string;
};

type DeleteButtonProps = {
  dropdownActions?: DeleteAction[];
  mainAction: DeleteAction;
  disabled?: boolean;
  onConfirm(deleteAction: DeleteAction): void;
};

type DeleteButtonState = {
  selectedAction: DeleteAction;
  isConfirmVisible: boolean;
};

export class DeleteButton extends React.Component<
  DeleteButtonProps,
  DeleteButtonState
> {
  constructor(props) {
    super(props);

    const { mainAction } = this.props;

    this.state = {
      isConfirmVisible: false,
      selectedAction: mainAction
    };
  }

  public render() {
    const { isConfirmVisible, selectedAction } = this.state;

    return (
      <Popconfirm
        title={selectedAction.confirmationMessage}
        visible={isConfirmVisible}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        icon={this.renderPopconfirmIcon}
        arrowPointAtCenter={true}
        placement="bottom"
        okType="danger"
        okText="Yes"
        cancelText="Cancel"
      >
        {this.renderCorrectOption()}
      </Popconfirm>
    );
  }

  private renderCorrectOption = () => {
    const { dropdownActions } = this.props;
    return dropdownActions
      ? this.renderWithDropDown()
      : this.renderWithoutDropDown();
  };

  private renderWithoutDropDown = () => {
    const { disabled } = this.props;
    return (
      <AntdButton
        disabled={disabled}
        onClick={this.onDefaultClick}
        className={deleteButtonStyle}
      >
        <Icon type="delete" />
        Delete
      </AntdButton>
    );
  };

  private renderWithDropDown = () => {
    const { disabled } = this.props;

    return (
      <Dropdown.Button
        overlay={this.renderMenu()}
        disabled={disabled}
        onClick={this.onDefaultClick}
        className={deleteDropdownButtonStyle}
      >
        <Icon type="delete" />
        Delete
      </Dropdown.Button>
    );
  };

  private renderMenu = () => {
    return (
      <Menu onClick={this.onMenuItemClick}>{this.renderMenuOptions()}</Menu>
    );
  };

  private renderMenuOptions = () => {
    const { dropdownActions } = this.props;
    return dropdownActions!.map(action => {
      return (
        <Menu.Item key={action.key}>
          <Icon type="arrow-right" />
          {action.optionTitle}
        </Menu.Item>
      );
    });
  };

  private get renderPopconfirmIcon() {
    return <WarningIcon type="warning" />;
  }

  private onMenuItemClick = ({ item }) => {
    const { dropdownActions } = this.props;
    const { index } = item.props;

    this.setState({
      isConfirmVisible: true,
      selectedAction: dropdownActions![index]
    });
  };

  private onDefaultClick = () => {
    const { mainAction } = this.props;
    this.setState({
      isConfirmVisible: true,
      selectedAction: mainAction
    });
  };

  private onConfirm = () => {
    this.setState({
      isConfirmVisible: false
    });

    const { onConfirm } = this.props;
    const { selectedAction } = this.state;
    if (onConfirm) {
      onConfirm(selectedAction);
    }
  };

  private onCancel = () => {
    this.setState({
      isConfirmVisible: false
    });
  };
}
