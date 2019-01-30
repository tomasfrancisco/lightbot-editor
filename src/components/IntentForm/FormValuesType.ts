import { Trigger } from "src/models";
import { IntentOutputType } from "src/types";

export type IntentTypeEnum = "DEFAULT" | "FALLBACK" | "WELCOME";

export type FormValues = {
  type?: IntentTypeEnum;
  name?: string;
  outputs: IntentOutputType[];
  triggers?: { [id: string]: Trigger };
};
