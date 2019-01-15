import gql from "graphql-tag";
import { graphql, QueryResult } from "react-apollo";
import { UnknownTrigger } from "~/models";
import { deleteUnknownTriggerFromCache } from "~/modules/ImproveView/apollo/gql/unknownTriggersCacheUpdate";
import { DeleteUnknownTriggersProps } from "~/modules/ImproveView/components";
import { getUnknownTriggerIds } from "../../utils";

export type DeleteUnknownTriggers = {
  unknownTriggerIds: string[];
  agentId: string;
};

const DELETE_UNKNOWN_TRIGGER_QUERY = gql`
  mutation DeleteUnknownTrigger($triggersToDelete: DeleteUnknownTriggers!) {
    deleteUnknownTriggers(input: $triggersToDelete) {
      id
    }
  }
`;

export type DeleteUnknownTriggerData = {
  unknownTrigger: UnknownTrigger;
};

export interface DeleteUnknownTriggerResult extends QueryResult<DeleteUnknownTriggerData> {}

export type DeleteUnknownTriggerFunction = (
  props: { variables: { triggersToDelete: DeleteUnknownTriggers } },
) => Promise<DeleteUnknownTriggerResult>;

export const deleteUnknownTrigger = graphql<{}, {}, {}, {}>(DELETE_UNKNOWN_TRIGGER_QUERY, {
  name: "onDeleteUnknownTrigger",
  options: ({ selectedTriggers, agentId }: DeleteUnknownTriggersProps) => ({
    update: cache => {
      deleteUnknownTriggerFromCache(cache, getUnknownTriggerIds(selectedTriggers), agentId);
    },
  }),
});
