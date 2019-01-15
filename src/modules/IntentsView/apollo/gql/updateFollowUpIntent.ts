import gql from "graphql-tag";
import { graphql, Query, QueryResult } from "react-apollo";
import { Intent, IntentActionData } from "~/models";
import { FETCH_INTENTS_QUERY } from "~/modules/IntentsView/apollo/gql";
import { IntentsViewProps } from "~/modules/IntentsView/IntentsView";

import { intentProps } from "./intentProps";

export const UPDATE_FOLLOW_UP_INTENT_QUERY = gql`
  mutation UpdateIntent($intent: UpdateIntent!) {
    updateIntent(input: $intent) {
      ${intentProps}
    }
  }
`;

export type UpdateFollowUpIntentData = {
  intents: Intent[];
};

export interface UpdateFollowUpIntentResult
  extends QueryResult<UpdateFollowUpIntentData> {}

export class UpdateFollowUpIntentQuery extends Query<
  UpdateFollowUpIntentData
> {}

export enum ActionType {}

export type OnUpdateFollowUpIntentFunction = (
  props: {
    variables: { intent: IntentActionData };
  }
) => Promise<UpdateFollowUpIntentResult>;

export const updateFollowUpIntent = graphql<{}, {}, {}, {}>(
  UPDATE_FOLLOW_UP_INTENT_QUERY,
  {
    name: "onUpdateFollowUpIntent",
    options: ({ agentId }: IntentsViewProps) => ({
      refetchQueries: [
        {
          query: FETCH_INTENTS_QUERY,
          variables: {
            agentId
          }
        }
      ]
    })
  }
);
