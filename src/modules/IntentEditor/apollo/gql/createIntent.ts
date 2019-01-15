import gql from "graphql-tag";
import _get from "lodash.get";
import _update from "lodash.update";
import { graphql, Query, QueryResult } from "react-apollo";
import { Intent, IntentActionData } from "~/models";
import { FETCH_INTENT_QUERY } from "~/modules/IntentEditor/apollo/gql/fetchIntent";
import { IntentEditorProps } from "~/modules/IntentEditor/IntentEditor";
import { FETCH_INTENTS_QUERY } from "~/modules/IntentsView/apollo/gql";

import { getIntentProps } from "./intentProps";

export const CREATE_INTENT_QUERY = gql`
  mutation CreateIntent($intent: CreateIntent!) {
    createIntent(input: $intent) {
      ${getIntentProps(true)}
    }
  }
`;

export type CreateIntentData = {
  intents: Intent[];
};

export interface CreateIntentResult extends QueryResult<CreateIntentData> {}

export class CreateIntentQuery extends Query<CreateIntentData> {}

export type CreateIntentFunction = (
  props: {
    variables: { intent: IntentActionData };
  }
) => Promise<CreateIntentResult>;

export const updateIntents = ({ cache, agentId, createdIntent }) => {
  const fetchIntentsQuery = {
    query: FETCH_INTENTS_QUERY,
    variables: {
      agentId
    }
  };

  let intentsData = cache.readQuery(fetchIntentsQuery);

  intentsData = {
    ...intentsData,
    intents: [..._get(intentsData, "intents", []), createdIntent]
  };

  cache.writeQuery({
    ...fetchIntentsQuery,
    data: intentsData
  });
};

export const updateIntentCache = ({ cache, agentId, createdIntent }) => {
  const createdIntentId = _get(createdIntent, "id", null);

  if (!createdIntentId) {
    return;
  }

  const fetchIntentQuery = {
    query: FETCH_INTENT_QUERY,
    variables: {
      agentId,
      intentId: createdIntentId
    }
  };

  cache.writeQuery({
    ...fetchIntentQuery,
    data: _update({}, ["intents", 0], () => createdIntent)
  });
};

export const createIntent = graphql<{}, {}, {}, {}>(CREATE_INTENT_QUERY, {
  name: "onCreateIntent",
  options: ({ agentId }: IntentEditorProps) => ({
    update: (cache, mutationResult) => {
      const createdIntent = _get(mutationResult, ["data", "createIntent"]);

      updateIntentCache({ cache, agentId, createdIntent });
      updateIntents({ cache, agentId, createdIntent });
    }
  })
});
