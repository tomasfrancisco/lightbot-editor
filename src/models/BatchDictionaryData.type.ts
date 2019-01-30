import { BatchDictionaryData as TypesBatch, DictionaryValueData } from "~/types";

export type BatchDictionaryData = TypesBatch & {
  values: DictionaryValueData[];
};

export { DictionaryValueData };
