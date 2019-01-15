import _isEqual from "lodash.isequal";
import { ActionType, Trigger, TriggerActionData } from "~/models";

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
        result.push({
          actionType: ActionType.UPDATE,
          id: item.id,
          value: formValues[item.id].value,
        });
      }

      delete formValues[item.id];
    } else {
      // original id doesn't exist in form
      result.push({
        actionType: ActionType.DELETE,
        id: item.id,
      });
    }

    return result;
  }, []);

  // formValues have now only the not identified ids
  const creations = Object.values(formValues).map<TriggerActionData>((trigger: Trigger) => ({
    actionType: !isCreatingIntent ? ActionType.CREATE : undefined,
    type: trigger.type,
    value: trigger.value,
  }));

  return [...modifications, ...creations];
};
