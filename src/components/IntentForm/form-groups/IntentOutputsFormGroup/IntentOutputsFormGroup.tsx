import {
  IntentJumpsOutputType,
  IntentLinkOutputType,
  IntentOutputType,
  IntentOutputTypeEnum,
  IntentPlainOutputType,
} from "@lightbot/types";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { css } from "react-emotion";
import uuid from "uuid/v4";
import { FormGroup, FormItem } from "~/components/Form";
import { renderLinkOutputInput, renderPlainOutputInput } from "~/components/Form/wrappers";
import { renderButtonsGroupOutputInput } from "~/components/Form/wrappers/ButtonOutputInput";
import { IntentOutputDisplayType } from "~/components/IntentForm/form-groups/IntentOutputsFormGroup/types/IntentOutputsDisplay.type";
import { FormIndexEnum } from "~/components/IntentForm/FormIndex.enum";
import { OutputAddButtonGroup } from "~/components/IntentForm/OutputAddButtonGroup";
import { Intent } from "~/models";
import { reactNestableDumbIssueFixer } from "~/utils";

type OutputItemsType = {
  components: React.ReactNode[];
  data: IntentOutputType[];
};

export type IntentOutputsFormGroupProps = FormComponentProps & {
  formKey: string;
  outputs: IntentOutputType[];
  intents?: Intent[];
  onTouch?(): void;
};

type IntentOutputsFormGroupState = {
  outputs: IntentOutputDisplayType[];
};

export class IntentOutputsFormGroup extends React.Component<
  IntentOutputsFormGroupProps,
  IntentOutputsFormGroupState
> {
  constructor(props) {
    super(props);

    this.state = {
      outputs: props.outputs.map(output => ({ id: uuid(), ...output })),
    };
  }

  public componentWillReceiveProps(nextProps) {
    this.updateOutputsState(nextProps);
  }

  public render() {
    const outputItems = this.getOutputItems();
    return (
      <>
        <FormGroup isSortable={true} data={outputItems.data} onChange={this.onOutputItemsSort}>
          {outputItems.components}
        </FormGroup>
        <OutputAddButtonGroup
          onTextClick={this.getOnAddHandler(IntentOutputTypeEnum.PLAIN)}
          onLinkClick={this.getOnAddHandler(IntentOutputTypeEnum.LINK)}
          onButtonClick={this.getOnAddHandler(IntentOutputTypeEnum.JUMPS)}
        />
      </>
    );
  }

  private getOutputItems(): OutputItemsType {
    const { form, intents } = this.props;
    const { outputs } = this.state;

    return outputs.reduce<{ components: any[]; data: any[] }>(
      (accumulator, item) => {
        const onRemoveHandler = this.getOnRemoveHandler(item.id);

        switch (item.type) {
          case "PLAIN":
            accumulator.components.push(
              <FormItem
                key={item.id}
                onRemove={onRemoveHandler}
                removeTooltipTitle="Remove"
                iconType="message"
              >
                {renderPlainOutputInput({
                  form,
                  formIndex: FormIndexEnum.OUTPUTS,
                  itemKey: item.id,
                  item: item as IntentPlainOutputType,
                })}
              </FormItem>,
            );
            accumulator.data.push(item);
            break;
          case "LINK":
            accumulator.components.push(
              <FormItem
                key={item.id}
                onRemove={onRemoveHandler}
                removeTooltipTitle="Remove"
                iconType="link"
              >
                {renderLinkOutputInput({
                  form,
                  formIndex: FormIndexEnum.OUTPUTS,
                  itemKey: item.id,
                  item: item as IntentLinkOutputType,
                })}
              </FormItem>,
            );
            accumulator.data.push(item);
            break;
          case "JUMPS":
            accumulator.components.push(
              <FormItem
                key={item.id}
                onRemove={onRemoveHandler}
                removeTooltipTitle="Remove"
                iconType="right-square-o"
              >
                {renderButtonsGroupOutputInput({
                  form,
                  formIndex: FormIndexEnum.OUTPUTS,
                  itemKey: item.id,
                  item: item as IntentJumpsOutputType,
                  intents,
                })}
              </FormItem>,
            );
            accumulator.data.push(item);
            break;
        }

        return accumulator;
      },
      { components: [], data: [] },
    );
  }

  private getNewOutputItem(type: IntentOutputTypeEnum): IntentOutputDisplayType {
    const id = uuid();
    switch (type) {
      case IntentOutputTypeEnum.JUMPS:
        return {
          id,
          ...({
            value: {
              jumps: [],
            },
            type: IntentOutputTypeEnum.JUMPS,
          } as IntentJumpsOutputType),
        };
      case IntentOutputTypeEnum.LINK:
        return {
          id,
          ...({
            value: {
              label: "",
              link: "",
            },
            type: IntentOutputTypeEnum.LINK,
          } as IntentLinkOutputType),
        };
      case IntentOutputTypeEnum.PLAIN:
        return {
          id,
          ...({
            value: {
              label: "",
            },
            type: IntentOutputTypeEnum.PLAIN,
          } as IntentPlainOutputType),
        };
      default:
        throw new Error(`Unknown output type ${type}`);
    }
  }

  private onOutputItemsSort = outputItems => {
    this.setState(
      {
        outputs: reactNestableDumbIssueFixer(outputItems),
      },
      this.throwOnTouchToParent,
    );
  };

  private getOnAddHandler = (type: IntentOutputTypeEnum) => () => {
    const { outputs } = this.state;

    this.setState(
      {
        outputs: outputs.concat(this.getNewOutputItem(type)),
      },
      this.throwOnTouchToParent,
    );
  };

  private getOnRemoveHandler = itemId => () => {
    const { outputs } = this.state;

    this.setState(
      {
        outputs: outputs.filter(output => output.id !== itemId),
      },
      this.throwOnTouchToParent,
    );
  };

  private getOutputsState(form): IntentOutputDisplayType {
    const values = form.getFieldValue("values");
    const formOutputs: IntentOutputDisplayType = values[FormIndexEnum.OUTPUTS];

    return formOutputs;
  }

  private updateOutputsState(nextProps) {
    const { outputs } = this.state;
    const formOutputs = this.getOutputsState(nextProps.form);

    if (formOutputs) {
      const updatedOutputs = outputs.map(output => ({
        ...formOutputs[output.id],
      }));

      this.setState({
        outputs: updatedOutputs,
      });
    }
  }

  private throwOnTouchToParent = () => {
    const { onTouch } = this.props;

    if (onTouch) {
      onTouch();
    }
  };
}
