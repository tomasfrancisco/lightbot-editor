import { AgentData as TypesAgentData } from "src/types";

export type AgentData = TypesAgentData & {
  widgetThemeData: string | {};
};
