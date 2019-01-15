/**
 * @deprecated
 * @lightbot/types should provided the necessary typings for the data model
 */

import { IntentOutputType } from "@lightbot/types";
import { Trigger, TriggerActionData } from "~/models/Trigger.type";

export type Intent = {
  id: string;
  name: string;
  parentId?: string | null;
  isTopLevel: boolean;
  isFallback: boolean;
  isWelcome: boolean;
  triggers: Trigger[];
  outputs: IntentOutputType[];
  children?: Intent[];
};

export type IntentActionData = {
  agentId?: string;
  id?: string;
  name?: string;
  parentId?: string | null;
  isTopLevel?: boolean;
  outputs?: IntentOutputType[];
  triggers?: TriggerActionData[];
};
