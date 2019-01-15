import _get from "lodash.get";
import _update from "lodash.update";
import { Agent } from "~/models";
import { FETCH_AGENTS_QUERY } from "~/modules/Dashboard/gql";
import { FETCH_UNKNOWN_TRIGGERS_QUERY } from "~/modules/ImproveView/apollo/gql";

export const deleteUnknownTriggerFromCache = (
  cache,
  selectedTriggers,
  agentId
) => {
  const fetchUnknownTriggersQuery = {
    query: FETCH_UNKNOWN_TRIGGERS_QUERY,
    variables: { agentId }
  };

  const unknownTriggersData = cache.readQuery(fetchUnknownTriggersQuery);

  if (unknownTriggersData) {
    const filteredData = _get(
      unknownTriggersData,
      ["findAgent", "unknownTriggers"],
      []
    ).filter(trigger => selectedTriggers.indexOf(trigger.id) < 0);

    const updatedData = _update(
      unknownTriggersData,
      ["findAgent", "unknownTriggers"],
      () => filteredData
    );

    cache.writeQuery({
      ...fetchUnknownTriggersQuery,
      data: updatedData
    });
  }

  deleteUnknownTriggerFromAgentsCache(cache, selectedTriggers, agentId);
};

export const deleteUnknownTriggerFromAgentsCache = (
  cache,
  selectedTriggers,
  agentId
) => {
  const fetchAgentsUnknownTriggersQuery = {
    query: FETCH_AGENTS_QUERY
  };

  const agentUnknownTriggersData = cache.readQuery(
    fetchAgentsUnknownTriggersQuery
  );
  if (agentUnknownTriggersData) {
    const agents: Agent[] = _get(agentUnknownTriggersData, ["agents"], []);
    const filteredAgents = agents.map(agent => {
      if (agentId === agent.id) {
        agent.unknownTriggersCount =
          agent.unknownTriggersCount - selectedTriggers.length;
        return agent;
      }
      return agent;
    });

    cache.writeQuery({
      ...fetchAgentsUnknownTriggersQuery,
      data: { agents: filteredAgents }
    });
  }
};
