import { DataProxy } from "apollo-cache";
import gql from "graphql-tag";
import _get from "lodash.get";
import _update from "lodash.update";
import { graphql, Query, QueryResult } from "react-apollo";
import { Intent, IntentActionData } from "~/models";
import { FETCH_INTENT_QUERY } from "~/modules/IntentEditor/apollo/gql/fetchIntent";
import { getIntentProps } from "~/modules/IntentEditor/apollo/gql/intentProps";
import { IntentEditorProps } from "~/modules/IntentEditor/IntentEditor";

export const UPDATE_INTENT_QUERY = gql`
  mutation UpdateIntent($intent: UpdateIntent!) {
    updateIntent(input: $intent) {
      ${getIntentProps(false)}
    }
  }
`;

export type UpdateIntentData = {
  intents: Intent[];
};

export interface UpdateIntentResult extends QueryResult<UpdateIntentData> {}

export class UpdateIntentQuery extends Query<UpdateIntentData> {}

export enum ActionType {}

export type UpdateIntentFunction = (
  props: {
    variables: { intent: IntentActionData };
  },
) => Promise<UpdateIntentResult>;

export const updateIntentInCache = (agentId: string, cache: DataProxy, updatedIntent: Intent) => {
  const queryObj = {
    query: FETCH_INTENT_QUERY,
    variables: {
      agentId,
      intentId: updatedIntent.id,
    },
  };

  let data;
  try {
    data = cache.readQuery(queryObj);
  } catch (err) {
    // Means there's no cache, so there's no need to update it.
    return;
  }

  if (data) {
    cache.writeQuery({
      ...queryObj,
      data: _update(data, ["intents", 0], () => updatedIntent),
    });
  } else {
    throw Error("Something got wrong with the mutation update");
  }
};

export const updateIntent = graphql<{}, {}, {}, {}>(UPDATE_INTENT_QUERY, {
  name: "onUpdateIntent",
  options: ({ agentId }: IntentEditorProps) => ({
    update: (cache, mutationResult) => {
      const updatedIntent = _get(mutationResult, ["data", "updateIntent"]);

      updateIntentInCache(agentId, cache, updatedIntent);
    },
  }),
});
