/**
 * @deprecated
 * @lightbot/types should provided the necessary typings for the data model
 */

import { ActionType } from "~/models/enums";

export type BatchDictionaryData = {
  id: string;
  name: string;
  values: DictionaryValueData[];
};

export type DictionaryValueData = {
  actionType: ActionType;
  id?: string;
  value?: string;
};
