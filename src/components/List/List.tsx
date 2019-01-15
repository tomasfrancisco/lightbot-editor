import { List as AntdList } from "antd";
import * as React from "react";
import styled, { css } from "react-emotion";
import { ElementClassesEnum } from "~/constants/ElementClassesEnum";

import { ListItem } from "./ListItem";

export type ListItemData = {
  id: string;
  title: string;
};

export type ListProps = {
  selectedListItemId?: string;
  items?: ListItemData[];
  onChangeItemSelection?: (itemId: string) => void;
};

export class List extends React.Component<ListProps> {
  public render() {
    const { items } = this.props;

    return <AntdList itemLayout="horizontal" dataSource={items} renderItem={this.renderItem} />;
  }

  private renderItem = (item: ListItemData, index: number) => {
    const { selectedListItemId } = this.props;

    return (
      <ListItem
        isSelectedItem={selectedListItemId === item.id}
        index={index}
        className={ElementClassesEnum.KEYWORD}
        item={item}
        onClick={this.onItemListClick(item)}
      >
        {item.title}
      </ListItem>
    );
  };

  private onItemListClick = (item: ListItemData) => () => {
    const { onChangeItemSelection, selectedListItemId } = this.props;

    if (item.id !== selectedListItemId) {
      if (onChangeItemSelection) {
        onChangeItemSelection(item.id);
      }
    }
  };
}
