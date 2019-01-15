import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql, QueryResult } from "react-apollo";
import { UnknownTrigger } from "~/models/UnknownTrigger.type";
import { ImproveViewProps } from "~/modules/ImproveView/ImproveView";

export const FETCH_UNKNOWN_TRIGGERS_QUERY = gql`
  query fetchUnknownTriggers($agentId: ID!) {
    findAgent(input: { agentId: $agentId }) {
      unknownTriggers {
        value
        id
        createdAt
      }
    }
  }
`;

export type FetchUnknownTriggersData = {
  unknownTriggers: UnknownTrigger[];
};

export interface FetchUnknownTriggersResult extends QueryResult<FetchUnknownTriggersData> {}

export const fetchUnknownTriggers = graphql<ImproveViewProps, FetchUnknownTriggersResult, {}, {}>(
  FETCH_UNKNOWN_TRIGGERS_QUERY,
  {
    options: ({ agentId }) => ({
      variables: {
        agentId,
      },
    }),
    props: ({ data }) => {
      return {
        loading: _get(data, ["loading"], true),
        unknownTriggers: _get(data, ["findAgent", "unknownTriggers"], []),
      };
    },
    skip: ({ agentId }) => !agentId,
  },
);
