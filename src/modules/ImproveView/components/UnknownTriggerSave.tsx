import { message } from "antd";
import * as React from "react";
import { compose } from "react-apollo";
import styled from "react-emotion";
import { Loading } from "~/components/Loading";
import { Intent } from "~/models";
import {
  CreateIntentWithUnknownTriggerFunction,
  createIntentWithUnknownTriggers,
  moveUnknownTriggersToIntent,
  OnMoveUnknownTriggersFunction,
} from "~/modules/ImproveView/apollo/gql";
import { IntentSelector } from "~/modules/ImproveView/components/IntentSelector";
import { withRouteParams } from "~/routing";

import {
  ColumnItem,
  CREATE_INTENT_ID,
  CreateIntent,
  CreateIntentUnknownTriggerDataInput,
} from "../utils";
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

    const triggers: CreateIntentUnknownTriggerDataInput[] = createIntentData.triggers.map(
      trigger => ({ id: trigger.id!, value: trigger.value![0] }),
    );

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
