import { Row, Select } from "antd";
import * as React from "react";
import styled, { css } from "react-emotion";
import { Button } from "~/components/Button";
import { Intent } from "~/models";

import { ColumnItem, CREATE_INTENT_ID, getUnknownTriggerIds } from "../utils";

const Option = Select.Option;

const selectStyle = css`
  width: 300px;
  margin-right: 5px;
`;

const MainIntentOption = styled("div")`
  font-style: bold;
  color: #ff6d00;
`;

type IntentSelectorProps = {
  selectedUnknownTriggers?: ColumnItem[];
  intentsList?: Intent[];
  onSaveClick: (
    selectedIntentId: string,
    selectedUnknownTriggerIds: string[]
  ) => void;
};

type IntentSelectorState = {
  selectedIntentId?: string;
};

export class IntentSelector extends React.Component<
  IntentSelectorProps,
  IntentSelectorState
> {
  constructor(props: IntentSelectorProps) {
    super(props);

    this.state = {
      selectedIntentId: undefined
    };
  }

  public render() {
    const { selectedIntentId } = this.state;

    return (
      <Row>
        <Select
          defaultValue={selectedIntentId}
          onChange={this.onChangeIntentSelector}
          allowClear={true}
          className={selectStyle}
          disabled={this.isSelectDisabled}
        >
          <Option value={CREATE_INTENT_ID} key={CREATE_INTENT_ID}>
            <MainIntentOption>Create new intent</MainIntentOption>
          </Option>
          {this.renderSelectOptions}
        </Select>
        <Button
          icon="plus"
          type="primary"
          onClick={this.onSaveClick}
          disabled={this.isButtonDisabled}
        >
          Add to intent
        </Button>
      </Row>
    );
  }

  private get isSelectDisabled() {
    const { selectedUnknownTriggers } = this.props;

    if (selectedUnknownTriggers) {
      if (selectedUnknownTriggers.length > 0) {
        return false;
      }
    }

    return true;
  }

  private get isButtonDisabled() {
    const { selectedIntentId } = this.state;

    if (!this.isSelectDisabled) {
      return selectedIntentId ? false : true;
    }
    return true;
  }

  private get renderSelectOptions() {
    const { intentsList } = this.props;

    if (intentsList) {
      return intentsList!.map(intent => {
        return (
          <Option value={intent.id} key={intent.id}>
            {intent.name}
          </Option>
        );
      });
    } else {
      return null;
    }
  }

  private onChangeIntentSelector = selectedIntentId => {
    this.setState({
      selectedIntentId
    });
  };

  private onSaveClick = () => {
    const { selectedUnknownTriggers, onSaveClick } = this.props;
    const { selectedIntentId } = this.state;
    if (selectedUnknownTriggers) {
      onSaveClick(
        selectedIntentId!,
        getUnknownTriggerIds(selectedUnknownTriggers)
      );
    }
  };
}
