import { FormComponentProps } from "antd/lib/form";
import { renderFormSelectGroupInput } from "~/components/Form/inputs/FormSelectGroupInput";
import { CombinationTrigger } from "~/models";

type RenderCombinationTriggerInputProps = FormComponentProps & {
  formIndex: string;
  item: CombinationTrigger;
  searchResults: Array<{ key: string; value: string }>;
};

export const renderCombinationTriggerInput = ({
  form,
  formIndex,
  item,
  searchResults,
}: RenderCombinationTriggerInputProps) =>
  renderFormSelectGroupInput({
    errorMessage: "Select from 2 to 3 keywords or delete this field.",
    form,
    getValueFromEvent: (value): CombinationTrigger => ({
      ...item,
      value,
    }),
    getValueProps: (trigger: CombinationTrigger) => {
      if (trigger) {
        return {
          value: trigger.value,
        };
      }

      return {
        value: trigger,
      };
    },
    itemKey: `values[${formIndex}][${item.id}]`,
    min: 2,
    searchResults,
    type: "object",
    validator: (rule, trigger: CombinationTrigger, cb) => {
      const { value } = trigger;
      return value && value.filter(Boolean).length >= rule.min ? cb() : cb(true);
    },
    value: item,
  });
