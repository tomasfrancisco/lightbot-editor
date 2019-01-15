import { TriggerActionData } from "~/models";

export type ColumnData = {
  title: string;
  dataIndex: string;
};

export type ColumnItem = {
  createdAt: string;
  key: string;
  value: string;
};

export type CreateIntent = {
  intentName: string;
  triggers: TriggerActionData[];
};

export type CreateIntentWithUnknownTriggers = {
  agentId: string;
  unknownTriggers: CreateIntentUnknownTriggerDataInput[];
  intentName: string;
};

export type CreateIntentUnknownTriggerDataInput = {
  id: string;
  value: string;
};
