import { AgentData as TypesAgentData } from "~/types";

export type AgentData = TypesAgentData & {
  widgetThemeData: string | {};
};
