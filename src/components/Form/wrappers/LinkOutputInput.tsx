import { FormComponentProps } from "antd/lib/form";
import { FormLink, renderFormLinkInput } from "src/components/Form/inputs/FormLinkInput";
import {
  emptyStringValidator,
  urlValidator,
  whitespaceValidator,
} from "~/components/Form/validators";
import { IntentLinkOutputType } from "~/types";

type RenderLinkOutputInputProps = FormComponentProps & {
  errorMessage?: string;
  itemKey: number;
  formIndex: string;
  item: IntentLinkOutputType;
};

export const renderLinkOutputInput = ({
  errorMessage,
  form,
  formIndex,
  item,
  itemKey,
}: RenderLinkOutputInputProps) => {
  return renderFormLinkInput({
    errorMessage: errorMessage || "Please, provide a label and a valid URL.",
    form,
    getValueFromEvent: (link: FormLink): IntentLinkOutputType => ({
      ...item,
      value: {
        ...link,
      },
    }),
    getValueProps: (linkOutput: IntentLinkOutputType) => {
      if (linkOutput) {
        return {
          value: {
            label: linkOutput.value.label,
            link: linkOutput.value.link,
          },
        };
      }

      return {
        value: {},
      };
    },
    itemKey: `values[${formIndex}][${itemKey}]`,
    type: "object",
    validator: (rule, linkOutput: IntentLinkOutputType, cb) => {
      const {
        value: { link, label },
      } = linkOutput;

      const isLabelValid = !whitespaceValidator(label) && !emptyStringValidator(label);
      const isLinkValid = urlValidator(link);

      isLabelValid && isLinkValid ? cb() : cb(true);
    },
    value: item,
  });
};
