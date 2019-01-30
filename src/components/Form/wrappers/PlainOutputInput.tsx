import { FormComponentProps } from "antd/lib/form";
import { renderFormTextInput } from "~/components/Form/inputs/FormTextInput";
import { emptyStringValidator, whitespaceValidator } from "~/components/Form/validators";
import { IntentPlainOutputType } from "~/types";

type RenderPlainOutputInputProps = FormComponentProps & {
  formIndex: IntentFormIndexType;
  itemKey: number;
  item: IntentPlainOutputType;
};

export const renderPlainOutputInput = ({
  form,
  formIndex,
  item,
  itemKey,
}: RenderPlainOutputInputProps) => {
  return renderFormTextInput({
    errorMessage: "Please, type a bot expression or delete this field.",
    form,
    getValueFromEvent: ({ target: { value } }): IntentPlainOutputType => ({
      ...item,
      value: { label: value },
    }),
    getValueProps: (output: IntentPlainOutputType) => {
      if (output) {
        return {
          value: output.value.label,
        };
      }

      return {
        value: output,
      };
    },
    itemKey: `values[${formIndex}][${itemKey}]`,
    type: "object",
    validator: (rule, output: IntentPlainOutputType, cb) => {
      const {
        value: { label },
      } = output;
      const isLabelValid = !whitespaceValidator(label) && !emptyStringValidator(label);

      isLabelValid ? cb() : cb(true);
    },
    value: item,
  });
};
