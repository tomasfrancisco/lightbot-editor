import { FormComponentProps } from "antd/lib/form";
import _get from "lodash.get";
import { emptyStringValidator, whitespaceValidator } from "~/components/Form/validators";
import { PlainTrigger } from "~/models";

import { renderFormTextTagInput } from "../inputs";

type RenderPlainTriggerInputProps = FormComponentProps & {
  formIndex: string;
  item: PlainTrigger;
  validTags: string[];
};

export const renderPlainTriggerInput = ({
  form,
  formIndex,
  item,
  validTags,
}: RenderPlainTriggerInputProps) => {
  return renderFormTextTagInput({
    errorMessage: "Please type a user expression or delete this field.",
    form,
    getValueFromEvent: (value): PlainTrigger => ({
      ...item,
      value: [value],
    }),
    getValueProps: (trigger: PlainTrigger) => {
      if (trigger) {
        return {
          value: trigger.value[0],
        };
      }

      return {
        value: trigger,
      };
    },
    itemKey: `values[${formIndex}][${item.id}]`,
    type: "object",
    validator: (rule, trigger: PlainTrigger, cb) => {
      const { value } = trigger;
      const isValueValid = !whitespaceValidator(value[0]) && !emptyStringValidator(value[0]);

      isValueValid ? cb() : cb(true);
    },
    value: item,
    validTags,
  });
};
