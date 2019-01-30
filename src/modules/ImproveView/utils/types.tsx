import { TriggerActionData } from "src/models";

export type ColumnData = {
  title: string;
  dataIndex: string;
};

export type ColumnItem = {
  createdAt: string;
  key: number;
  value: string;
};

export type CreateIntent = {
  intentName: string;
  triggers: TriggerActionData[];
};

export type CreateIntentWithUnknownTriggers = {
  agentId: string;
  unknownTriggers: number[];
  intentName: string;
};

export type CreateIntentUnknownTriggerDataInput = {
  id: number;
  value: string;
};
