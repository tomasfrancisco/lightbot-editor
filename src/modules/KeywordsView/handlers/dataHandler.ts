import _isEqual from "lodash.isequal";
import { BatchDictionaryData, DictionaryValueData, Keyword, KeywordValue } from "~/models";
import { ActionType } from "~/types";

export const getDictionaryObjectToUpdate = (
  selectedKeyword: Keyword,
  values: KeywordValue[],
  name: string,
  formValues: { string: string },
) => {
  const valueToReturn: BatchDictionaryData = {
    id: selectedKeyword.id,
    name,
    values: transformToDictionaryValueData(values, formValues),
  };

  return valueToReturn;
};

const transformToDictionaryValueData = (
  originalValues: KeywordValue[],
  formValues: { string: string },
) => {
  const modifications: DictionaryValueData[] = originalValues.reduce<DictionaryValueData[]>(
    (result, item) => {
      if (formValues[item.id]) {
        const newValue = formValues[item.id];

        if (!_isEqual(newValue, item.value)) {
          // in case it was updated
          const actionType: ActionType = "UPDATE";
          result.push({
            actionType,
            id: item.id,
            value: newValue,
          });
        }

        delete formValues[item.id];
      } else {
        const actionType: ActionType = "DELETE";
        result.push({
          actionType,
          id: item.id,
          value: null,
        });
      }

      return result;
    },
    [],
  );

  // formValues have now only the not identified ids
  const actionType: ActionType = "CREATE";
  const creations: DictionaryValueData[] = Object.values(formValues).map<DictionaryValueData>(
    value => ({
      actionType,
      id: null,
      value,
    }),
  );

  return [...modifications, ...creations];
};
