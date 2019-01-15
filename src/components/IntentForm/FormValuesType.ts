import { IntentOutputType } from "@lightbot/types";
import { IntentTypeEnum } from "~/components/IntentForm/IntentTypeFormField";
import { Trigger } from "~/models";

export type FormValues = {
  type?: IntentTypeEnum;
  name?: string;
  outputs: IntentOutputType[];
  triggers?: { [id: string]: Trigger };
};
