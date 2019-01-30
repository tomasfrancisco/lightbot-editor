import gql from "graphql-tag";
import { graphql, Query, QueryResult } from "react-apollo";
import { Intent, IntentExpression } from "src/models";

import { intentsProps } from "./intentsProps";

export const FIND_INTENTS_BY_EXPRESSION_QUERY = gql`
  query FindIntentsByExpression($input: IntentExpression!) {
    findIntentsByExpression(input: $input) {
      ${intentsProps}
    }
  }
`;

export type FindIntentsByExpressionData = {
  intents: Intent[];
};

export interface FindIntentsByExpressionResult extends QueryResult<FindIntentsByExpressionData> {}

export class FindIntentsByExpressionQuery extends Query<FindIntentsByExpressionData> {}

export type OnFindIntentsByExpressionFunction = (
  props: { variables: { input: IntentExpression } },
) => Promise<FindIntentsByExpressionResult>;

export const findIntentsByExpression = graphql<{}, {}, {}, {}>(FIND_INTENTS_BY_EXPRESSION_QUERY, {
  name: "onFindIntentsByExpression",
});
