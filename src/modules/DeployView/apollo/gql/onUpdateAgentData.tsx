import gql from "graphql-tag";
import _get from "lodash.get";
import _update from "lodash.update";
import { graphql, QueryResult } from "react-apollo";
import { AgentData } from "~/models/AgentData.type";
import { DeployViewProps } from "~/modules/DeployView";
import { FETCH_AGENT_DATA_QUERY } from "~/modules/DeployView/apollo/gql/fetchAgentData";

const UPDATE_WIDGET_DATA = gql`
  mutation UpdateWidgetData(
    $agentId: ID!
    $widgetInputPlaceholder: String!
    $widgetTeaser: String!
    $widgetHotspotIcon: String!
    $widgetThemeData: String!
  ) {
    updateWidgetData(
      input: {
        agentId: $agentId
        widgetInputPlaceholder: $widgetInputPlaceholder
        widgetTeaser: $widgetTeaser
        widgetHotspotIcon: $widgetHotspotIcon
        widgetThemeData: $widgetThemeData
      }
    ) {
      widgetInputPlaceholder
      widgetTeaser
      widgetHotspotIcon
      widgetThemeData
    }
  }
`;

export type UpdateWidgetData = {
  agentData: AgentData;
};

export interface UpdateWidgetDataResult extends QueryResult<UpdateWidgetData> {}

export type UpdateWidgetDataFunction = (
  props: {
    variables: {
      agentId: string;
      widgetInputPlaceholder: string;
      widgetTeaser: string;
      widgetHotspotIcon: string;
      widgetThemeData: string;
    };
  }
) => Promise<UpdateWidgetDataResult>;

export const updateWidgetData = graphql<{}, {}, {}, {}>(UPDATE_WIDGET_DATA, {
  name: "onUpdateWidgetData",
  options: ({ agentId }: DeployViewProps) => ({
    update: (cache, data) => {
      updateWidgetDataCache(cache, agentId, data);
    }
  })
});

const updateWidgetDataCache = (cache, agentId, newData) => {
  const fetchAgentDataQuery = {
    query: FETCH_AGENT_DATA_QUERY,
    variables: { agentId }
  };

  const widgetInputPlaceholder = _get(
    newData,
    ["data", "updateWidgetData", "widgetInputPlaceholder"],
    null
  );
  const widgetHotspotIcon = _get(
    newData,
    ["data", "updateWidgetData", "widgetHotspotIcon"],
    null
  );
  const widgetTeaser = _get(
    newData,
    ["data", "updateWidgetData", "widgetTeaser"],
    null
  );
  const widgetThemeData = _get(
    newData,
    ["data", "updateWidgetData", "widgetThemeData"],
    null
  );

  const agentData = cache.readQuery(fetchAgentDataQuery);

  if (agentData) {
    let data = _get(agentData, ["findAgent"], {});
    data = _update(
      data,
      ["data", "widgetInputPlaceholder"],
      () => widgetInputPlaceholder
    );
    data = _update(
      data,
      ["data", "widgetHotspotIcon"],
      () => widgetHotspotIcon
    );
    data = _update(data, ["data", "widgetTeaser"], () => widgetTeaser);
    data = _update(data, ["data", "widgetThemeData"], () => widgetThemeData);

    cache.writeQuery({
      ...fetchAgentDataQuery,
      data: { findAgent: data }
    });
  }
};
