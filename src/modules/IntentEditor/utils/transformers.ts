import _isEqual from "lodash.isequal";
import { Trigger, TriggerActionData } from "src/models";
import { ActionType } from "src/types";

export const transformToTriggersActionData = (
  isCreatingIntent: boolean,
  originalItems: Trigger[] = [],
  formValues: { [id: string]: Trigger } = {},
): TriggerActionData[] => {
  const modifications = originalItems.reduce<TriggerActionData[]>((result, item) => {
    if (formValues[item.id]) {
      // original id exists in form
      if (!_isEqual(formValues[item.id], item)) {
        // in case it was updated
        const actionType: ActionType = "UPDATE";
        result.push({
          actionType,
          id: item.id,
          value: formValues[item.id].value,
        });
      }

      delete formValues[item.id];
    } else {
      // original id doesn't exist in form
      const actionType: ActionType = "DELETE";
      result.push({
        actionType,
        id: item.id,
      });
    }

    return result;
  }, []);

  // formValues have now only the not identified ids
  const actionType: ActionType = "CREATE";
  const creations = Object.values(formValues).map<TriggerActionData>((trigger: Trigger) => ({
    actionType: !isCreatingIntent ? actionType : undefined,
    type: trigger.type,
    value: trigger.value,
  }));

  return [...modifications, ...creations];
};
