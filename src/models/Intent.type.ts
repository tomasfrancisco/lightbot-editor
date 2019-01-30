/**
 * @deprecated
 * ./types should provided the necessary typings for the data model
 */

import { Trigger, TriggerActionData } from "~/models/Trigger.type";
import { IntentOutputType } from "~/types";

export type Intent = {
  id: number;
  name: string;
  parentId?: number | null;
  isTopLevel: boolean;
  isFallback: boolean;
  isWelcome: boolean;
  triggers: Trigger[];
  outputs: IntentOutputType[];
  children?: Intent[];
};

export type IntentActionData = {
  agentId?: string;
  id?: number;
  name?: string;
  parentId?: number | null;
  isTopLevel?: boolean;
  outputs?: IntentOutputType[];
  triggers?: TriggerActionData[];
};
