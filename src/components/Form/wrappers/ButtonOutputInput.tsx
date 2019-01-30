import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { FormButton } from "src/components/Form/inputs/FormButtonInput";
import { FormButtonsGroupButtons } from "src/components/Form/inputs/FormButtonsGroupButton";
import { emptyStringValidator, whitespaceValidator } from "src/components/Form/validators";
import { Intent } from "src/models";
import { IntentJumpsOutputType } from "src/types";

type RenderButtonsGroupOutputInputProps = FormComponentProps & {
  errorMessage?: string;
  formIndex: string;
  itemKey: number;
  item: IntentJumpsOutputType;
  intents?: Intent[];
};

export const renderButtonsGroupOutputInput = ({
  form,
  formIndex,
  item,
  itemKey,
  intents,
}: RenderButtonsGroupOutputInputProps) => {
  return (
    form &&
    form.getFieldDecorator(`values[${formIndex}][${itemKey}]`, {
      getValueFromEvent: (jumps: FormButton[]): IntentJumpsOutputType => ({
        ...item,
        value: {
          jumps,
        },
      }),
      // @ts-ignore
      getValueProps: (output: IntentJumpsOutputType) => {
        if (output) {
          return {
            value: output.value.jumps,
          };
        }

        return {
          value: output,
        };
      },
      initialValue: item,
      rules: [
        {
          message: "Please, provide a label and value to all buttons.",
          required: true,
          type: "object",
          validator: (rule, buttonOutput: IntentJumpsOutputType, cb) => {
            const {
              value: { jumps },
            } = buttonOutput;

            const isValid =
              jumps
                .map(button => {
                  const isLabelValid =
                    !whitespaceValidator(button.label) && !emptyStringValidator(button.label);
                  const isButtonValueValue = button.intentId > -1;

                  return isLabelValid && isButtonValueValue;
                })
                .filter(Boolean).length === jumps.length;

            isValid ? cb() : cb(true);
          },
        },
      ],
      validateTrigger: ["onChange", "onBlur"],
    })(<FormButtonsGroupButtons intents={intents} />)
  );
};
