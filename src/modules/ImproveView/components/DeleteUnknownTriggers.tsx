import * as React from "react";
import { compose } from "react-apollo";
import { DeleteButton, mainDeleteAction } from "src/components/DeleteButton";
import {
  deleteUnknownTrigger,
  DeleteUnknownTriggerFunction,
} from "src/modules/ImproveView/apollo/gql";

import { ColumnItem, getUnknownTriggerIds } from "../utils";

export type DeleteUnknownTriggersProps = {
  agentId: string;
  selectedTriggers: ColumnItem[];
  onDeleteUnknownTrigger: DeleteUnknownTriggerFunction;
};

class DeleteUnknownTriggersDisconnected extends React.Component<DeleteUnknownTriggersProps> {
  public render() {
    const { selectedTriggers } = this.props;

    return (
      <DeleteButton
        onConfirm={this.onDelete}
        mainAction={mainDeleteAction}
        disabled={selectedTriggers ? selectedTriggers.length === 0 : true}
      />
    );
  }

  private onDelete = () => {
    const { agentId, selectedTriggers } = this.props;

    this.props.onDeleteUnknownTrigger({
      variables: {
        triggersToDelete: {
          agentId,
          unknownTriggerIds: getUnknownTriggerIds(selectedTriggers),
        },
      },
    });
  };
}

export const DeleteUnknownTriggers = compose(deleteUnknownTrigger)(
  DeleteUnknownTriggersDisconnected,
);
