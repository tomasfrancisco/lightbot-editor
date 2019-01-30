import { Agent as TypesAgent } from "~/types";

export type Agent = Pick<TypesAgent, "id" | "name" | "unknownTriggersCount">;
