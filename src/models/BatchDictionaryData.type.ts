import { BatchDictionaryData as TypesBatch, DictionaryValueData } from "src/types";

export type BatchDictionaryData = TypesBatch & {
  values: DictionaryValueData[];
};
