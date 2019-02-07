import { css } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";
import { ListItemData } from "src/components/List/List";
import theme from "src/config/theme.json";

const StyledListItem = styled("div")`
  font-size: 14px;
  padding: 16px 23px;
  font-weight: bold;
  color: ${theme["text-color"]};
  &:hover {
    color: ${theme["text-color-selected"]};
    cursor: pointer;
  }

  &.list-item-odd {
    background-color: ${theme["list-item-background-odd"]};
  }
  &.list-item-even {
    background-color: ${theme["list-item-background-even"]};
  }
`;

const selectedStyle = css`
  color: ${theme["text-color-selected"]};
`;

export type ListItemProps = {
  className?: string;
  isSelectedItem: boolean;
  index: number;
  item: ListItemData;
  onClick: (item: ListItemData, position: number) => void;
};

export class ListItem extends React.Component<ListItemProps> {
  public render() {
    const { item } = this.props;

    return (
      <StyledListItem key={item.id} className={this.itemClassName} onClick={this.onClick}>
        {item.title}
      </StyledListItem>
    );
  }

  private get itemClassName() {
    const { isSelectedItem, index, className } = this.props;
    let newClassName = "";

    if (isSelectedItem) {
      newClassName += selectedStyle + " ";
    }

    newClassName += index % 2 === 0 ? "list-item-even" : "list-item-odd";

    return className ? [className, newClassName].join(" ") : newClassName;
  }

  private onClick = e => {
    const { onClick, item, index } = this.props;
    onClick(item, index);
  };
}
