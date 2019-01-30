import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql, Query, QueryResult } from "react-apollo";
import { Agent } from "src/models";

import { DashboardViewProps } from "../DashboardView";

export const FETCH_AGENTS_QUERY = gql`
  query fetchAgents {
    agents {
      name
      id
      unknownTriggersCount
    }
  }
`;

export type FetchAgentsData = {
  agents: Agent[];
};

export interface FetchAgentsResult extends QueryResult<FetchAgentsData> {}

export class FetchAgentsQuery extends Query<FetchAgentsData> {}

export const fetchAgents = graphql<DashboardViewProps, FetchAgentsData, {}, {}>(
  FETCH_AGENTS_QUERY,
  {
    props: props => {
      const { data } = props;
      return {
        agents: _get(data, ["agents"]),
        loading: _get(data, ["loading"]),
      };
    },
  },
);
