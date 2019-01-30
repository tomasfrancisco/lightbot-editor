import { List, Modal } from "antd";
import Form, { FormComponentProps } from "antd/lib/form";
import _get from "lodash.get";
import * as React from "react";
import styled, { css } from "react-emotion";
import { TitleInput } from "~/components/Form";
import theme from "~/config/theme.js";
import { TriggerActionData } from "~/models";

import { ColumnItem, CreateIntent, NEW_INTENT_KEY_NAME } from "../utils";

export type CreateIntentModalProps = FormComponentProps & {
  isVisible: boolean;
  selectedUnknownTriggers?: ColumnItem[];
  onClose: () => void;
  onCreate: (creatIntent: CreateIntent) => void;
};

const ListWrapper = styled("div")`
  height: 200px;
  margin-top: 20px;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  overflow: auto;
`;

const noMarginTitleStyle = css`
  margin-left: 0px;
`;

const UnknownTriggerItem = styled("div")`
  padding: 20px;

  &.list-item-odd {
    background-color: ${theme["list-item-background-odd"]};
  }
  &.list-item-even {
    background-color: ${theme["list-item-background-even"]};
  }
`;

const HeaderView = styled("div")`
  text-align: center;
`;

class CreateIntentModalDisconnected extends React.Component<CreateIntentModalProps> {
  public render() {
    const { isVisible, form } = this.props;
    return (
      <Form>
        <Modal
          title="Create new intent"
          visible={isVisible}
          okButtonDisabled={false}
          cancelButtonDisabled={true}
          onCancel={this.props.onClose}
          destroyOnClose={true}
          okText={"Create"}
          onOk={this.onCreate}
        >
          <TitleInput
            form={form}
            itemKey={NEW_INTENT_KEY_NAME}
            value={""}
            rowClassName={noMarginTitleStyle}
            placeholder={"New intent name"}
          />
          <ListWrapper>
            <List
              header={this.listHeader}
              itemLayout="horizontal"
              dataSource={this.selectedUnknownTriggersData}
              renderItem={this.renderItem}
            />
          </ListWrapper>
        </Modal>
      </Form>
    );
  }

  private get listHeader() {
    return <HeaderView>User says</HeaderView>;
  }

  private renderItem = (item, index) => {
    return (
      <UnknownTriggerItem className={index % 2 === 0 ? "list-item-even" : "list-item-odd"}>
        {item.title}
      </UnknownTriggerItem>
    );
  };

  private get selectedUnknownTriggersData() {
    const { selectedUnknownTriggers } = this.props;

    if (!selectedUnknownTriggers) {
      return [];
    }

    return selectedUnknownTriggers.map(unknownTrigger => ({
      title: unknownTrigger.value,
    }));
  }

  private onCreate = () => {
    const { form } = this.props;
    form.validateFields((error, fields) => {
      if (!error) {
        this.props.onCreate({
          intentName: _get(fields, ["values", NEW_INTENT_KEY_NAME], ""),
          triggers: this.triggers,
        });
      }
    });
  };

  private get triggers(): TriggerActionData[] {
    const { selectedUnknownTriggers } = this.props;

    if (selectedUnknownTriggers) {
      return selectedUnknownTriggers.map(unknownTrigger => ({
        id: unknownTrigger.key,
        value: [unknownTrigger.value],
      }));
    }

    return [];
  }
}

export const CreateIntentModal = Form.create()(CreateIntentModalDisconnected);
