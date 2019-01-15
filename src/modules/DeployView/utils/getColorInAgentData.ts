import { AgentData } from "~/models/AgentData.type";

export const getColorInAgentData = (
  property: string,
  agentData?: AgentData,
): string | undefined => {
  // In case widgetThemeData exists, it should need parsing
  if (agentData && typeof agentData.widgetThemeData === "string") {
    const widgetThemeData = JSON.parse(agentData.widgetThemeData);

    if (widgetThemeData && widgetThemeData[property]) {
      return widgetThemeData[property];
    }

    return agentData.widgetThemeData[property];
  }

  // Value should not exist then...
  return;
};
