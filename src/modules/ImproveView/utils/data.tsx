import { UnknownTrigger } from "src/models";
import { ColumnData, ColumnItem, getFormattedDate } from "src/modules/ImproveView/utils";

export const CREATE_INTENT_ID = "0";
export const NEW_INTENT_KEY_NAME = "newIntentName";
export const columns: ColumnData[] = [
  {
    dataIndex: "createdAt",
    title: "Date",
  },
  {
    dataIndex: "value",
    title: "Message",
  },
];

export const getUnknownTriggerIds = (unknownTriggers: ColumnItem[]) => {
  return unknownTriggers.map(trigger => trigger.key);
};

export const generateDataSource = (unknownTriggers?: UnknownTrigger[]): ColumnItem[] => {
  if (unknownTriggers) {
    return unknownTriggers.map(unknownTrigger => {
      return {
        createdAt: getFormattedDate(unknownTrigger.createdAt),
        key: unknownTrigger.id,
        value: unknownTrigger.value,
      };
    });
  }
  return [];
};
