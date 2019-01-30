import { List as AntdList } from "antd";
import * as React from "react";
import { ElementClassesEnum } from "~/constants/ElementClassesEnum";

import { ListItem } from "./ListItem";

export type ListItemData = {
  id: number;
  title: string;
};

export type ListProps = {
  selectedListItemId?: number;
  items?: ListItemData[];
  onChangeItemSelection?: (itemId: number) => void;
};

export class List extends React.Component<ListProps> {
  public render() {
    const { items } = this.props;

    return <AntdList itemLayout="horizontal" dataSource={items} renderItem={this.renderItem} />;
  }

  private renderItem = (item: ListItemData, index: number) => {
    const { selectedListItemId } = this.props;
    const className: ElementClassesName = "keyword";
    return (
      <ListItem
        isSelectedItem={selectedListItemId === item.id}
        index={index}
        className={className}
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
