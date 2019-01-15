/**
 * @deprecated
 * @lightbot/types should provided the necessary typings for the data model
 */

import { ActionType } from "~/models/enums";

export enum TriggerTypeEnum {
  PLAIN = "PLAIN",
  COMBINATION = "COMBINATION"
}

interface ITrigger {
  id: string;
  type: TriggerTypeEnum;
}

export interface PlainTrigger extends ITrigger {
  value: [string];
}

export interface CombinationTrigger extends ITrigger {
  value: string[];
}

export type Trigger = PlainTrigger | CombinationTrigger;

export type TriggerActionData = {
  id?: string;
  type?: TriggerTypeEnum;
  value?: string[] | [string];
  actionType?: ActionType;
};
