import { Icon, Tooltip } from "antd";
import * as React from "react";
import styled from "react-emotion";
import theme from "~/config/theme.js";

const Wrapper = styled("div")`
  display: flex;
  margin-right: 8px;
  line-height: 2.5;
  height: 32px;
`;

const StyledIconAction = styled("a")`
  margin-right: -4px;
  color: ${theme["default-inactive-color"]};
`;

export enum SortButtonDirectionEnum {
  UP = "UP",
  DOWN = "DOWN",
}

type SortButtonProps = {
  onClick(direction: SortButtonDirectionEnum): void;
};

export class SortButton extends React.Component<SortButtonProps> {
  public render() {
    return (
      <Wrapper>
        <Tooltip title="Move up">
          <StyledIconAction onClick={this.getOnClickHandler(SortButtonDirectionEnum.UP)}>
            <Icon type="arrow-up" />
          </StyledIconAction>
        </Tooltip>
        <Tooltip title="Move down">
          <StyledIconAction onClick={this.getOnClickHandler(SortButtonDirectionEnum.DOWN)}>
            <Icon type="arrow-down" />
          </StyledIconAction>
        </Tooltip>
      </Wrapper>
    );
  }

  private getOnClickHandler = (direction: SortButtonDirectionEnum) => () =>
    this.props.onClick(direction);
}
