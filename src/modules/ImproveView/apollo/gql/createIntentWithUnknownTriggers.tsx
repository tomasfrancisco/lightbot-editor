import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql, QueryResult } from "react-apollo";
import { Intent } from "src/models";
import { UnknownTriggerSaveProps } from "src/modules/ImproveView/components";
import { updateIntentCache, updateIntents } from "src/modules/IntentEditor/apollo/gql";
import { getIntentProps } from "src/modules/IntentEditor/apollo/gql/intentProps";

import { CreateIntentWithUnknownTriggers, getUnknownTriggerIds } from "../../utils";
import { deleteUnknownTriggerFromCache } from "./unknownTriggersCacheUpdate";

const CREATE_INTENT_WITH_UNKNOWN_TRIGGERS = gql`
  mutation CreateIntentWithUnknownTriggers($input: CreateIntentWithUnknownTriggers!) {
    createIntentWithUnknownTriggers(input: $input) {
      ${getIntentProps(true)}
    }
  }
`;

export type CreateIntentWithUnknownTriggersData = {
  intent: Intent;
};

export interface CreateIntentWithUnknownTriggersResult
  extends QueryResult<CreateIntentWithUnknownTriggersData> {}

export type CreateIntentWithUnknownTriggerFunction = (
  props: { variables: { input: CreateIntentWithUnknownTriggers } },
) => Promise<CreateIntentWithUnknownTriggersResult>;

export const createIntentWithUnknownTriggers = graphql<UnknownTriggerSaveProps, {}, {}, {}>(
  CREATE_INTENT_WITH_UNKNOWN_TRIGGERS,
  {
    name: "onCreateIntentWithUnknownTriggers",
    options: ({ selectedUnknownTriggers, agentId }) => ({
      update: (cache, mutationResult) => {
        const createdIntent = _get(mutationResult, ["data", "createIntentWithUnknownTriggers"]);

        updateIntentCache({ cache, agentId, createdIntent });
        updateIntents({ cache, agentId, createdIntent });

        if (selectedUnknownTriggers) {
          deleteUnknownTriggerFromCache(
            cache,
            getUnknownTriggerIds(selectedUnknownTriggers),
            agentId,
          );
        }
      },
    }),
  },
);
