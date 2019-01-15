import gql from "graphql-tag";
import _get from "lodash.get";
import _remove from "lodash.remove";
import _update from "lodash.update";
import { graphql, Query, QueryResult } from "react-apollo";
import { Intent } from "~/models";
import { getIntentProps } from "~/modules/IntentEditor/apollo/gql/intentProps";
import { IntentEditorProps } from "~/modules/IntentEditor/IntentEditor";
import { FETCH_INTENTS_QUERY } from "~/modules/IntentsView/apollo/gql";

export const DELETE_INTENT_QUERY = gql`
  mutation DeleteIntent($intentId: String!, $withChildren: Boolean!) {
    deleteIntent(input: { id: $intentId, withChildren: $withChildren }) {
      ${getIntentProps(false)}
    }
  }
`;

export type DeleteIntentData = {
  intents: Intent[];
};

export interface DeleteIntentResult extends QueryResult<DeleteIntentData> {}

export class DeleteIntentQuery extends Query<DeleteIntentData> {}

export enum ActionType {}

export type DeleteIntentFunction = (
  props: {
    variables: { intentId: string; withChildren: boolean };
  },
) => void;

const updateIntents = ({ cache, intentId, agentId }) => {
  const queryObj = {
    query: FETCH_INTENTS_QUERY,
    variables: {
      agentId,
    },
  };

  const data = cache.readQuery(queryObj);

  if (data) {
    const filteredData = _remove(
      _get(data, ["intents"], []),
      i => _get(i, ["id"], "") !== intentId,
    );
    const updatedData = _update(data, ["intents"], () => filteredData);

    cache.writeQuery({
      ...queryObj,
      data: updatedData,
    });
  }
};

export const deleteIntent = graphql<{}, {}, {}, {}>(DELETE_INTENT_QUERY, {
  name: "onDeleteIntent",
  options: ({ intentId, agentId }: IntentEditorProps) => ({
    update: cache => {
      updateIntents({
        cache,
        agentId,
        intentId,
      });

      return null;
    },
  }),
});
