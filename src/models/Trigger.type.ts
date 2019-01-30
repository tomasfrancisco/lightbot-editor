/**
 * @deprecated
 * ./types should provided the necessary typings for the data model
 */

import { ActionType } from "src/types";

export enum TriggerTypeEnum {
  PLAIN = "PLAIN",
  COMBINATION = "COMBINATION",
}

interface ITrigger {
  id: number;
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
  id?: number;
  type?: TriggerTypeEnum;
  value?: string[] | [string];
  actionType?: ActionType;
};
