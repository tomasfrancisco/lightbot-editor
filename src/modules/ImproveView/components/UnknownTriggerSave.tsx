import { message } from "antd";
import * as React from "react";
import { compose } from "react-apollo";
import styled from "react-emotion";
import { Loading } from "src/components/Loading";
import { Intent } from "src/models";
import {
  CreateIntentWithUnknownTriggerFunction,
  createIntentWithUnknownTriggers,
  moveUnknownTriggersToIntent,
  OnMoveUnknownTriggersFunction,
} from "src/modules/ImproveView/apollo/gql";
import { IntentSelector } from "src/modules/ImproveView/components/IntentSelector";
import { withRouteParams } from "src/routing";

import { ColumnItem, CREATE_INTENT_ID, CreateIntent } from "../utils";
import { CreateIntentModal } from "./CreateIntentModal";

const Row = styled("div")`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export type UnknownTriggerSaveProps = {
  intentsLoading?: boolean;
  agentId: string;
  selectedUnknownTriggers?: ColumnItem[];
  availableIntents?: Intent[];
  onMoveUnknownTriggersToIntent: OnMoveUnknownTriggersFunction;
  onCreateIntentWithUnknownTriggers: CreateIntentWithUnknownTriggerFunction;
};

type UnknownTriggerSaveState = {
  isCreatIntentModalVisible: boolean;
};

class UnknownTriggerSaveDisconnected extends React.Component<
  UnknownTriggerSaveProps,
  UnknownTriggerSaveState
> {
  constructor(props) {
    super(props);
    this.state = { isCreatIntentModalVisible: false };
  }

  public render() {
    const { selectedUnknownTriggers, availableIntents, intentsLoading } = this.props;
    const { isCreatIntentModalVisible } = this.state;

    if (intentsLoading) {
      return <Loading />;
    } else {
      return (
        <Row>
          <IntentSelector
            selectedUnknownTriggers={selectedUnknownTriggers}
            onSaveClick={this.onSaveUnknownTrigger}
            intentsList={availableIntents}
          />
          <CreateIntentModal
            isVisible={isCreatIntentModalVisible}
            onClose={this.onCloseCreateIntentModal}
            selectedUnknownTriggers={selectedUnknownTriggers}
            onCreate={this.onCreateIntent}
          />
        </Row>
      );
    }
  }

  private onSaveUnknownTrigger = (intentId, unknownTriggerIds) => {
    const { agentId } = this.props;
    if (intentId === CREATE_INTENT_ID) {
      this.setState({
        isCreatIntentModalVisible: true,
      });
    } else {
      this.props.onMoveUnknownTriggersToIntent({
        variables: { unknownTriggerIds, intentId, agentId },
      });
    }
  };

  private onCreateIntent = (createIntentData: CreateIntent) => {
    const { agentId, onCreateIntentWithUnknownTriggers } = this.props;

    const triggers = createIntentData.triggers.map(trigger => trigger.id!);

    message
      .loading(`Creating ${createIntentData.intentName}`)
      .promise.then(() =>
        onCreateIntentWithUnknownTriggers({
          variables: {
            input: {
              agentId,
              intentName: createIntentData.intentName,
              unknownTriggers: triggers,
            },
          },
        }),
      )
      .then(() => {
        message.success(`${createIntentData.intentName} created successfully!`);
        this.onCloseCreateIntentModal();
      })
      .catch(() => {
        message.error(`An error occurred while creating the ${createIntentData.intentName}.`);
      });
  };

  private onCloseCreateIntentModal = () => {
    this.setState({
      isCreatIntentModalVisible: false,
    });
  };
}

export const UnknownTriggerSave = compose(
  withRouteParams(["agentId"]),
  moveUnknownTriggersToIntent,
  createIntentWithUnknownTriggers,
)(UnknownTriggerSaveDisconnected);
