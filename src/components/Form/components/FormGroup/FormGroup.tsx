import { Icon } from "antd";
import _get from "lodash.get";
import * as React from "react";
import styled from "@emotion/styled";
import Nestable from "react-nestable";

export type FormGroupItem = { component: any; data: any; children?: any };

const HandlerContainer = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NestableWithHandler = styled("div")`
  display: flex;
  width: 30px;
  height: 35px;
  cursor: grab;
`;

type FormGroupProps = {
  isSortable?: boolean;
  children: any;
  data?: any[];
  onChange?(items: FormGroupItem[], item: any): void;
};

/**
 * FormGroup passes down a `isSortable` prop to its children
 */
export class FormGroup extends React.Component<FormGroupProps> {
  private static defaultProps = {
    onChange: () => {
      return;
    },
  };

  public render() {
    const { isSortable, children, onChange } = this.props;

    if (isSortable) {
      return (
        <Nestable
          maxDepth={2} // TODO: Needs a fix on the Nestable implementation to allow 1
          isSortable={isSortable}
          items={this.items}
          renderItem={this.renderItem}
          handler={
            <NestableWithHandler>
              <HandlerContainer>
                <Icon type="bars" style={{ fontSize: "18px", color: "#d9d9d9" }} />
              </HandlerContainer>
            </NestableWithHandler>
          }
          onChange={onChange}
        />
      );
    }

    return children;
  }

  private get items() {
    const { children, data } = this.props;

    return React.Children.map(children, (child, childIndex) => {
      const componentData = _get(data, [childIndex], {});
      if (!componentData.id) {
        throw new Error("Form group needs data.id to be defined");
      }

      return {
        component: child,
        data: componentData, // This needs testing
        id: componentData.id,
      };
    });
  }

  private renderItem = ({ item, collapseIcon, handler }) => {
    const { isSortable } = this.props;
    const newProps = isSortable
      ? {
          sortHandler: handler,
        }
      : {};
    return React.cloneElement(item.component, newProps);
  };
}
