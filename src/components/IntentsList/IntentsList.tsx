import "./nestable.css";

import { notification } from "antd";
import _get from "lodash.get";
import { PathFunction } from "path-to-regexp";
import * as React from "react";
import Nestable from "react-nestable";
import { CollapseButton } from "~/components/IntentsList/CollapseButton";
import { IntentItem } from "~/components/IntentsList/IntentItem";
import { Intent } from "~/models";

import { getPathById } from "./utils/getPathById";

export type IntentListProps = {
  toPath: PathFunction;
  intents: Intent[];
  selectedIntentId?: string;
  onIntentClick?(intentId: string): void;
  onChange(intent: Intent): void;
};

type IntentsListState = {
  items: Intent[];
};

export class IntentsList extends React.Component<IntentListProps, IntentsListState> {
  public render() {
    const { intents } = this.props;

    return (
      <Nestable
        maxDepth={4}
        items={intents}
        renderItem={this.renderItem}
        onChange={this.onChange}
        renderCollapseIcon={this.renderCollapseIcon}
        collapsed={true}
      />
    );
  }

  private renderItem = ({
    item,
    index,
    collapseIcon,
  }: {
    item: Intent;
    index: number;
    collapseIcon: React.ReactElement<any>;
  }) => {
    const { onIntentClick, selectedIntentId, toPath } = this.props;
    const onClick = () => {
      if (onIntentClick) {
        onIntentClick(item.id);
      }
    };

    return (
      <IntentItem
        index={index}
        intent={item}
        onClick={onClick}
        collapseIcon={collapseIcon}
        isSelectedIntent={selectedIntentId === item.id}
        to={toPath({ intentId: item.id })}
      />
    );
  };

  private onChange = (intentsList, intent: Intent) => {
    const { onChange } = this.props;
    const pathToChild = getPathById(intent.id, intentsList);

    let parentId = intent.parentId || null;
    let isTopLevel = intent.isTopLevel;

    if (pathToChild.length === 1) {
      parentId = null;
      isTopLevel = true;
    } else {
      const pathToParent = pathToChild.slice(0, -2);
      parentId = _get(intentsList, [...pathToParent, "id"], null);
      isTopLevel = !parentId;
    }

    if (intent.parentId !== parentId || intent.isTopLevel !== isTopLevel) {
      onChange({ ...intent, parentId, isTopLevel });
    } else {
      notification.open({
        description: "Intent sorting is not supported.",
        duration: 5,
        message: "Not supported.",
      });
    }
  };

  private renderCollapseIcon = ({ isCollapsed }) => {
    return <CollapseButton isCollapsed={isCollapsed} />;
  };
}
