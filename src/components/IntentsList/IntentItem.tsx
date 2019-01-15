import { Icon, Tag } from "antd";
import * as React from "react";
import styled, { cx } from "react-emotion";
import { Link } from "react-router-dom";
import theme from "~/config/theme.js";
import { ElementIdsEnum } from "~/constants/ElementIdsEnum";
import { Intent } from "~/models";

const Wrapper = styled("div")`
  padding-left: 20px;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;

  transition: all 0.3s;
  &.list-item-parent {
    &.list-item-odd {
      background-color: ${theme["list-item-background-odd"]};
    }
    &.list-item-even {
      background-color: ${theme["list-item-background-even"]};
    }
  }

  .title {
    font-size: 14px;
    padding: 16px 5px;
    font-weight: bold;

    color: ${theme["text-color"]};

    &.is-top-level {
      color: ${theme["text-color"]};
      font-weight: bold;
    }
    &.selected-intent {
      color: ${theme["primary-color"]};
    }

    &:hover {
      color: ${theme["text-color-selected"]};
      cursor: pointer;
    }
  }
`;

const StyledIcon = styled(Icon)`
  font-size: 14px;
  padding: 10px 5px;
  padding-left: 0px;
  color: rgb(0, 0, 0, 0.2);
  cursor: default;
  transform: scaleX(-1);
`;

const StyledTag = styled(Tag)`
  margin-left: 5px;
  font-size: 9px;
  line-height: 15px;
  height: 16px;
  padding: 0 4px;
`;

export type IntentItemProps = {
  index: number;
  intent: Intent;
  isSelectedIntent: boolean;
  collapseIcon: React.ReactElement<any>;
  to: string;
  onClick(): void;
};

export class IntentItem extends React.Component<IntentItemProps> {
  public render() {
    const { intent, onClick, collapseIcon, index, to } = this.props;
    return (
      <Link to={to}>
        <Wrapper
          id={intent.isWelcome ? ElementIdsEnum.WELCOME_INTENT : undefined}
          className={cx(
            index % 2 === 0 ? "list-item-even" : "list-item-odd",
            intent.parentId ? "list-item-child" : "list-item-parent",
          )}
        >
          {collapseIcon}
          <StyledIcon
            type={!intent.children!.length ? (intent.isTopLevel ? "arrow-left" : "enter") : ""}
          />
          <div
            className={cx(
              "title",
              {
                ["is-top-level"]: intent.isTopLevel,
              },
              this.selectedClass,
            )}
            onClick={onClick}
          >
            {intent.name}
            {this.renderTags}
          </div>
        </Wrapper>
      </Link>
    );
  }

  private get selectedClass() {
    const { isSelectedIntent } = this.props;
    if (isSelectedIntent) {
      return "selected-intent";
    }
    return null;
  }

  private get renderTags() {
    const { intent } = this.props;
    return [
      intent.isFallback ? (
        <StyledTag key="fallback" color={theme["error-color"]}>
          Fallback
        </StyledTag>
      ) : null,
      intent.isWelcome ? (
        <StyledTag key="welcome" color={theme["info-color"]}>
          Welcome
        </StyledTag>
      ) : null,
    ];
  }
}
