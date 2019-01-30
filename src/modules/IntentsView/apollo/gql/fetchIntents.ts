import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql, Query, QueryResult } from "react-apollo";
import { Intent } from "src/models";
import { IntentsViewProps } from "src/modules/IntentsView";

import { intentsProps } from "./intentsProps";

export const FETCH_INTENTS_QUERY = gql`
  query fetchIntents($agentId: String!) {
    intents(where: { agentId: $agentId, isTopLevel: true }) {
      ${intentsProps}
    }
  }
`;

export type FetchIntentsData = {
  intents: Intent[];
};

export interface FetchIntentsResult extends QueryResult<FetchIntentsData> {}

export class FetchIntentsQuery extends Query<FetchIntentsData> {}

export const fetchIntents = graphql<IntentsViewProps, FetchIntentsResult, {}, {}>(
  FETCH_INTENTS_QUERY,
  {
    options: ({ agentId }: IntentsViewProps) => ({
      variables: {
        agentId,
      },
    }),
    props: ({ data }) => ({
      intents: _get(data, ["intents"], []),
      intentsLoading: _get(data, ["loading"], true),
    }),
    skip: ({ agentId }: IntentsViewProps) => !agentId,
  },
);
