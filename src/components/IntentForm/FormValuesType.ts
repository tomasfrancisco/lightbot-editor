import { IntentTypeEnum } from "~/components/IntentForm/IntentTypeFormField";
import { Trigger } from "~/models";
import { IntentOutputType } from "~/types";

export type IntentTypeEnum = "DEFAULT" | "FALLBACK" | "WELCOME";

export type FormValues = {
  type?: IntentTypeEnum;
  name?: string;
  outputs: IntentOutputType[];
  triggers?: { [id: string]: Trigger };
};
