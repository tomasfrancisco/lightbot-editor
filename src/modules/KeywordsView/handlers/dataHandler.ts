import _isEqual from "lodash.isequal";
import {
  ActionType,
  BatchDictionaryData,
  DictionaryValueData,
  Keyword,
  KeywordValue,
} from "~/models";

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

          result.push({
            actionType: ActionType.UPDATE,
            id: item.id,
            value: newValue,
          });
        }

        delete formValues[item.id];
      } else {
        result.push({
          actionType: ActionType.DELETE,
          id: item.id,
        });
      }

      return result;
    },
    [],
  );

  // formValues have now only the not identified ids
  const creations: DictionaryValueData[] = Object.values(formValues).map<DictionaryValueData>(
    value => ({
      actionType: ActionType.CREATE,
      value,
    }),
  );

  return [...modifications, ...creations];
};
