import gql from "graphql-tag";
import _get from "lodash.get";
import { graphql, QueryResult } from "react-apollo";
import { AgentData } from "src/models/AgentData.type";
import { DeployViewProps } from "src/modules/DeployView";

export const FETCH_AGENT_DATA_QUERY = gql`
  query fetchAgentData($agentId: String!) {
    findAgent(input: { agentId: $agentId }) {
      data {
        widgetInputPlaceholder
        widgetTeaser
        widgetHotspotIcon
        widgetThemeData
      }
    }
  }
`;

export type FetchAgentData = {
  data: AgentData;
};

export interface FetchAgentDataResult extends QueryResult<FetchAgentData> {}

export const fetchAgentData = graphql<DeployViewProps, FetchAgentDataResult, {}, {}>(
  FETCH_AGENT_DATA_QUERY,
  {
    options: ({ agentId }) => ({
      variables: {
        agentId,
      },
    }),
    props: ({ data }) => {
      return {
        agentData: _get(data, ["findAgent", "data"], {}),
        loading: _get(data, ["loading"], undefined),
      };
    },
    skip: ({ agentId }) => !agentId,
  },
);
