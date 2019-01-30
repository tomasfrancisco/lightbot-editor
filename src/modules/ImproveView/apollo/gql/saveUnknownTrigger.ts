import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql, QueryResult } from "react-apollo";
import { Intent } from "~/models";
import { UnknownTriggerSaveProps } from "~/modules/ImproveView/components";
import { updateIntentInCache } from "~/modules/IntentEditor/apollo/gql";
import { getIntentProps } from "~/modules/IntentEditor/apollo/gql/intentProps";

import { getUnknownTriggerIds } from "../../utils";
import { deleteUnknownTriggerFromCache } from "./unknownTriggersCacheUpdate";

const MOVE_UNKNOWN_TRIGGERS_TO_INTENT_QUERY = gql`
  mutation MoveUnknownTriggersToIntent(
    $agentId: String!
    $unknownTriggerIds: [Int!]!
    $intentId: Int!
  ) {
    moveUnknownTriggersToIntent(
      input: { unknownTriggerIds: $unknownTriggerIds, intentId: $intentId, agentId: $agentId }
    ) {
        ${getIntentProps(false)}
    }
  }
`;

export type MoveUnknownTriggersData = {
  updatedIntent: Intent;
};

export interface MoveUnknownTriggersResult extends QueryResult<MoveUnknownTriggersData> {}

export type OnMoveUnknownTriggersFunction = (
  props: {
    variables: {
      agentId: string;
      unknownTriggerIds: number[];
      intentId: number;
    };
  },
) => Promise<MoveUnknownTriggersResult>;

export const moveUnknownTriggersToIntent = graphql<UnknownTriggerSaveProps, {}, {}, {}>(
  MOVE_UNKNOWN_TRIGGERS_TO_INTENT_QUERY,
  {
    name: "onMoveUnknownTriggersToIntent",
    options: ({ selectedUnknownTriggers, agentId }) => ({
      update: (cache, mutationResult) => {
        const updatedIntent: Intent = _get(mutationResult, ["data", "moveUnknownTriggersToIntent"]);
        deleteUnknownTriggerFromCache(
          cache,
          getUnknownTriggerIds(selectedUnknownTriggers || []),
          agentId,
        );
        updateIntentInCache(agentId, cache, updatedIntent);
      },
    }),
  },
);
