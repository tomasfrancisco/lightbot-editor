import { Agent as TypesAgent } from "src/types";

export type Agent = Pick<TypesAgent, "id" | "name" | "unknownTriggersCount">;
