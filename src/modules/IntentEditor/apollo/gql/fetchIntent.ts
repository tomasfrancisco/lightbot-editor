import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql, Query, QueryResult } from "react-apollo";
import { Intent } from "src/models";
import { IntentEditorProps } from "src/modules/IntentEditor";
import { getIntentProps } from "src/modules/IntentEditor/apollo/gql/intentProps";

export const FETCH_INTENT_QUERY = gql`
  query fetchIntent($intentId: Int!, $agentId: String!) {
    intents(where: { id: $intentId, agentId: $agentId }) {
      ${getIntentProps(false)}
    }
  }
`;

export type FetchIntentData = {
  intents: Intent[];
};

export interface FetchIntentResult extends QueryResult<FetchIntentData> {}

export class FetchIntentQuery extends Query<FetchIntentData> {}

export const fetchIntent = graphql<IntentEditorProps, {}, {}, {}>(FETCH_INTENT_QUERY, {
  options: ({ agentId, intentId }) => ({
    variables: {
      agentId,
      intentId,
    },
  }),
  props: ({ data }) => ({
    intent: _get(data, ["intents", 0]),
    loading: _get(data, ["loading"]),
  }),
  skip: ({ agentId, intentId, isCreating }) => isCreating || (!agentId && !intentId),
});
